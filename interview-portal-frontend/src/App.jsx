import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ShareExperience from "./pages/ShareExperience.jsx";
import MyExperiences from "./pages/MyExperiences.jsx";
import PublicExperiences from "./pages/PublicExperiences.jsx";
import ResumeUpload from "./pages/ResumeUploader.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PublicExperiences />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/share"
          element={
            <PrivateRoute>
              <ShareExperience />
            </PrivateRoute>
          }
        />
        <Route
          path="/mine"
          element={
            <PrivateRoute>
              <MyExperiences />
            </PrivateRoute>
          }
        />
        <Route path="/public" element={<PublicExperiences />} />
        <Route
          path="/resume"
          element={
            <PrivateRoute>
              <ResumeUpload />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
