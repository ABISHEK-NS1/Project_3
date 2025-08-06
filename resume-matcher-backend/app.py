from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz
import spacy
from spacy.matcher import PhraseMatcher
from spacy.tokenizer import Tokenizer
from spacy.util import compile_prefix_regex, compile_suffix_regex, compile_infix_regex
import json
from pymongo import MongoClient

# Setup
app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["interview_portal"]
experiences_collection = db["experiences"]

# Load spaCy and customize tokenizer
nlp = spacy.load("en_core_web_sm")
prefixes = list(nlp.Defaults.prefixes)
suffixes = list(nlp.Defaults.suffixes)
infixes = [x for x in nlp.Defaults.infixes if '+' not in x and '#' not in x]

nlp.tokenizer = Tokenizer(
    nlp.vocab,
    prefix_search=compile_prefix_regex(prefixes).search,
    suffix_search=compile_suffix_regex(suffixes).search,
    infix_finditer=compile_infix_regex(infixes).finditer,
    token_match=None,
)

# Load skill list
with open("skills.txt", "r") as f:
    skill_list = [line.strip().lower() for line in f if line.strip()]

matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
patterns = [nlp.make_doc(skill) for skill in skill_list]
matcher.add("SKILLS", patterns)

# Extract text from PDF
def extract_text_from_pdf(file_stream):
    text = ""
    with fitz.open(stream=file_stream.read(), filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text

# Extract skills from text
def extract_skills(text):
    doc = nlp(text.lower())
    matches = matcher(doc)
    return list({doc[start:end].text.lower() for _, start, end in matches})

# Focus on important sections from resume
def extract_relevant_sections(text):
    text = text.lower()
    sections = []
    if "technical skills" in text:
        start = text.find("technical skills")
        end = text.find("projects") if "projects" in text else len(text)
        sections.append(text[start:end])
    if "projects" in text:
        start = text.find("projects")
        end = text.find("summary") if "summary" in text else len(text)
        sections.append(text[start:end])
    return " ".join(sections) if sections else text

# Jaccard similarity
def jaccard(set1, set2):
    return len(set1 & set2) / len(set1 | set2) if set1 | set2 else 0

@app.route("/upload-resume/", methods=["POST"])
def upload_resume():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    # Step 1: Extract and preprocess resume
    resume_text = extract_text_from_pdf(file)
    relevant_text = extract_relevant_sections(resume_text)
    resume_skills = extract_skills(relevant_text)
    resume_set = set(resume_skills)

    # Step 2: Extract skills from role, tips, mistakes, questions
    experiences = list(experiences_collection.find())
    for exp in experiences:
        text_block = " ".join([
            str(exp.get("role", "")),
            str(exp.get("tips", "")),
            str(exp.get("mistakes", "")),
            " ".join(exp.get("questions", []))
        ])
        exp["skills"] = extract_skills(text_block)

    # Step 3: Compute Jaccard similarity
    matches = []
    for exp in experiences:
        score = jaccard(resume_set, set(exp["skills"]))
        if score > 0:
            matches.append((score, exp))

    # Step 4: Sort and select top 3 matches
    top_matches = sorted(matches, key=lambda x: x[0], reverse=True)[:3]

    response = []
    for score, exp in top_matches:
        response.append({
            "company": exp.get("company"),
            "role": exp.get("role"),
            "experienceLevel": exp.get("experienceLevel"),
            "questions": exp.get("questions"),
            "tips": exp.get("tips"),
            "mistakes": exp.get("mistakes"),
        })

    print("Extracted Resume Skills:", resume_skills)
    print("Top Matching Experiences:", response)

    return jsonify({
        "skills": resume_skills,
        "experiences": response
    })

if __name__ == "__main__":
    app.run(port=8000, debug=True)
