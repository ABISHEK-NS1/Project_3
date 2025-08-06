export default function ExperienceCard({ exp }) {
  const getLogoUrl = (companyName) => {
    if (!companyName) return null;
    const domain = `${companyName.toLowerCase().replace(/\s+/g, "")}.com`;
    return `https://logo.clearbit.com/${domain}`;
  };

  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: "12px",
        padding: "16px",
        margin: "16px 0",
        background: "#f9f9ff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* Company Logo */}
      <img
        src={getLogoUrl(exp.company)}
        alt={`${exp.company} logo`}
        style={{ height: "40px", marginBottom: "8px" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/default-logo.png"; // fallback logo in /public folder
        }}
      />

      <h3 style={{ color: "#2a2a72", marginBottom: "6px" }}>
        {exp.company} – <span style={{ color: "#555" }}>{exp.role}</span>
      </h3>

      <p style={{ margin: "6px 0", fontSize: "14px" }}>
        <strong>Level:</strong> {exp.experienceLevel}
      </p>

      <strong>Questions:</strong>
      <ul style={{ paddingLeft: "18px", margin: "8px 0" }}>
        {exp.questions.map((q, i) => (
          <li key={i} style={{ marginBottom: "4px" }}>
            {q}
          </li>
        ))}
      </ul>

      {exp.tips && (
        <p style={{ marginTop: "8px", fontStyle: "italic" }}>
          <strong>Tips:</strong> {exp.tips}
        </p>
      )}

      {exp.mistakes && (
        <p style={{ marginTop: "8px", color: "#b30000" }}>
          <strong>Mistakes:</strong> {exp.mistakes}
        </p>
      )}
    </div>
  );
}
