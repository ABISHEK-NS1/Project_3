import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faFile,
  faGlobe,
  faShare,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  return (
    <div style={dashboardContainer}>
      <h1 style={headingStyle}>
        <FontAwesomeIcon icon={faChartSimple} fade />
        Dashboard
      </h1>
      <div style={linkContainer}>
        <Link to="/share" style={linkStyle}>
          <FontAwesomeIcon icon={faShare} style={iconStyle} />
          Share Experience
        </Link>
        <Link to="/mine" style={linkStyle}>
          <FontAwesomeIcon icon={faFile} style={iconStyle} />
          My Experiences
        </Link>
        <Link to="/public" style={linkStyle}>
          <FontAwesomeIcon icon={faGlobe} style={iconStyle} />
          Public Experiences
        </Link>
        <Link to="/resume" style={linkStyle}>
          <FontAwesomeIcon icon={faUpload} style={iconStyle} />
          Upload Resume
        </Link>
      </div>
    </div>
  );
}

const dashboardContainer = {
  padding: "32px",
  maxWidth: "500px",
  margin: "0 auto",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const headingStyle = {
  color: "#2a2a72",
  marginBottom: "24px",
  fontSize: "28px",
  borderBottom: "2px solid #2a2a72",
  paddingBottom: "8px",
};

const linkContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const linkStyle = {
  padding: "12px 20px",
  background: "#ffffff",
  border: "1px solid #dcdcdc",
  borderRadius: "10px",
  textDecoration: "none",
  color: "#2a2a72",
  fontWeight: "500",
  fontSize: "16px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
  display: "flex",
  alignItems: "center",
  transition: "all 0.3s ease",
};

const iconStyle = {
  marginRight: "10px",
  color: "#555",
  fontSize: "18px",
};
