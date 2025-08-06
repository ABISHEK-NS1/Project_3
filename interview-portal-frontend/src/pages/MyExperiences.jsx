import { useEffect, useState } from "react";
import API from "../api/api";
import ExperienceCard from "../components/ExperienceCard";

export default function MyExperiences() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/experiences/my").then((res) => setItems(res.data));
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ color: "#2a2a72" }}>My Interview Experiences</h2>
      {items.length === 0 ? (
        <p style={{ marginTop: "20px" }}>
          You haven’t shared any experiences yet.
        </p>
      ) : (
        items.map((exp) => <ExperienceCard key={exp._id} exp={exp} />)
      )}
    </div>
  );
}
