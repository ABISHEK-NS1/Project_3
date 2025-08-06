import re

SKILL_VOCAB = [
    "python", "java", "c", "c++", "javascript", "react", "node", "express", "mongodb",
    "mysql", "html", "css", "sql", "mern", "django", "flask", "pandas", "numpy",
    "machine learning", "data science", "engineering", "api"
]

def extract_skills(text):
    text = text.lower()
    found_skills = set()

    for skill in SKILL_VOCAB:
        if skill in text:
            found_skills.add(skill)

    # Optionally extract any token that looks like a technology/keyword
    tokens = re.findall(r'\b[a-zA-Z0-9\-\+\.#]+\b', text)
    found_skills.update(tokens)

    return list(found_skills)

def fetch_matching_experiences(skills, collection):
    if not skills:
        return []

    query = {
        "$or": [
            {"tips": {"$regex": "|".join(skills), "$options": "i"}},
            {"mistakes": {"$regex": "|".join(skills), "$options": "i"}},
            {"role": {"$regex": "|".join(skills), "$options": "i"}},
        ]
    }
    matched_docs = list(collection.find(query))
    result = []

    for doc in matched_docs:
        result.append({
            "company": doc.get("company", ""),
            "role": doc.get("role", ""),
            "experienceLevel": doc.get("experienceLevel", ""),
            "tips": doc.get("tips", ""),
            "mistakes": doc.get("mistakes", ""),
            "questions": doc.get("questions", []),
        })

    return result
