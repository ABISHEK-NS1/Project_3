/*import { useState } from "react";
import API from "../api/api";

export default function ShareExperience() {
  const [form, setForm] = useState({
    company: "",
    role: "",
    experienceLevel: "",
    questions: "",
    tips: "",
    mistakes: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/experiences", {
      ...form,
      questions: form.questions.split("|"),
    });
    alert("Shared!");
  };

  return (
    <form
      onSubmit={submit}
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "24px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fefefe",
      }}
    >
      <h2 style={{ color: "#2a2a72", marginBottom: "16px" }}>
        Share Your Interview Experience
      </h2>
      {[
        "company",
        "role",
        "experienceLevel",
        "questions",
        "tips",
        "mistakes",
      ].map((field) => (
        <div key={field} style={{ marginBottom: "12px" }}>
          <label style={{ fontWeight: "bold" }}>{field}</label>
          <input
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            placeholder={field}
            required={field !== "tips" && field !== "mistakes"}
            style={inputStyle}
          />
        </div>
      ))}
      <small>
        Use <code>|</code> to separate multiple questions.
      </small>
      <br />
      <br />
      <button style={buttonStyle}>Submit</button>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  marginTop: "6px",
};

const buttonStyle = {
  padding: "10px 16px",
  backgroundColor: "#2a2a72",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};*/

import { useState } from "react";
import API from "../api/api";
import styles from "../styles/ShareExperience.module.css";

export default function ShareExperience() {
  const [form, setForm] = useState({
    company: "",
    role: "",
    experienceLevel: "",
    questions: "",
    tips: "",
    mistakes: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/experiences", {
      ...form,
      questions: form.questions.split("|"),
    });
    alert("Experience Shared Successfully!");
    setForm({
      company: "",
      role: "",
      experienceLevel: "",
      questions: "",
      tips: "",
      mistakes: "",
    });
  };

  return (
    <form onSubmit={submit} className={styles.formContainer}>
      <h2 className={styles.heading}>Share Your Interview Experience</h2>
      {["company", "role", "experienceLevel", "questions", "tips", "mistakes"].map((field) => (
        <div key={field} className={styles.formGroup}>
          <label className={styles.label}>{field}</label>
          <input
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            placeholder={field}
            required={field !== "tips" && field !== "mistakes"}
            className={styles.input}
          />
        </div>
      ))}
      <small className={styles.note}>
        Use <code>|</code> to separate multiple questions.
      </small>
      <button className={styles.submitBtn}>Submit</button>
    </form>
  );
}

