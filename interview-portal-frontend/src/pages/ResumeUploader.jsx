import React, { useState } from "react";

const ResumeUploader = () => {
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [matchedExperiences, setMatchedExperiences] = useState([]);
  const [error, setError] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload-resume/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setExtractedSkills(data.skills || []);
        setMatchedExperiences(data.experiences || []);
        setError(null);
      } else {
        setError(data.error || "Unknown error");
      }
    } catch (error) {
      setError("Something went wrong while uploading. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload Your Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        style={styles.fileInput}
      />

      {error && <p style={styles.error}>{error}</p>}

      {extractedSkills.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Extracted Skills</h3>
          <ul style={styles.skillList}>
            {extractedSkills.map((skill, i) => (
              <li key={i} style={styles.skillItem}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      {matchedExperiences.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Top Matched Experiences</h3>
          {matchedExperiences.map((match, index) => (
            <div key={index} style={styles.card}>
              <h4 style={styles.cardTitle}>
                {match.role} @ {match.company}
              </h4>
              <p>
                <strong>Experience Level:</strong> {match.experienceLevel}
              </p>
              {match.tips && (
                <p>
                  <strong>Tips:</strong> {match.tips}
                </p>
              )}
              {match.mistakes && (
                <p>
                  <strong>Mistakes:</strong> {match.mistakes}
                </p>
              )}
              {match.questions && match.questions.length > 0 && (
                <div>
                  <strong>Questions:</strong>
                  <ul style={styles.questionList}>
                    {match.questions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9fb",
  },
  title: {
    color: "#2a2a72",
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "24px",
  },
  fileInput: {
    marginBottom: "24px",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginBottom: "16px",
  },
  section: {
    marginTop: "32px",
  },
  sectionTitle: {
    fontSize: "22px",
    color: "#2a2a72",
    marginBottom: "16px",
  },
  skillList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    listStyle: "none",
    padding: 0,
  },
  skillItem: {
    backgroundColor: "#e0e7ff",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    color: "#1e3a8a",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e0e0e0",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "8px",
  },
  questionList: {
    paddingLeft: "20px",
    marginTop: "8px",
  },
};

export default ResumeUploader;
