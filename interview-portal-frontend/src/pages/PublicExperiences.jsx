import { useEffect, useState } from "react";
import API from "../api/api.js";
import ExperienceCard from "../components/ExperienceCard";

export default function PublicExperiences() {
  const [items, setItems] = useState([]);
  const [companyFilter, setCompanyFilter] = useState("");
  const [skillsFilter, setSkillsFilter] = useState("");

  useEffect(() => {
    API.get("/experiences").then((res) => setItems(res.data));
  }, []);

  const filteredItems = items.filter((exp) => {
    const matchesCompany = exp.company
      .toLowerCase()
      .includes(companyFilter.toLowerCase());

    let combinedText = `${exp.role}`.toLowerCase();
    combinedText += " ";
    combinedText += `${exp.mistakes}`.toLowerCase();
    combinedText += " ";
    combinedText += `${exp.tips}`.toLowerCase();

    for (const question of exp.questions) {
      combinedText += ` ${question}`.toLowerCase();
    }

    const skillTokens = skillsFilter
      .toLowerCase()
      .split(",")
      .map((s) => s.trim());
    const matchesSkills = skillTokens.every(
      (skill) => skill === "" || combinedText.includes(skill)
    );

    return matchesCompany && matchesSkills;
  });

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ color: "#2a2a72", marginBottom: "16px" }}>
        Public Experiences
      </h2>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search by company..."
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Search by skills (comma-separated)..."
          value={skillsFilter}
          onChange={(e) => setSkillsFilter(e.target.value)}
          style={inputStyle}
        />
      </div>

      {filteredItems.length === 0 ? (
        <p>No matching experiences found.</p>
      ) : (
        filteredItems.map((exp) => <ExperienceCard key={exp._id} exp={exp} />)
      )}
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  flex: "1",
  minWidth: "250px",
};
