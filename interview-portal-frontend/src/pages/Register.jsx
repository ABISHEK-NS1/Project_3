import API from '../api/api';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Registration failed. Try a different email.');
    }
  };

  return (
    <form onSubmit={submit} style={formStyle}>
      <h2 style={titleStyle}>Register</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        style={inputStyle}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        style={inputStyle}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Register</button>
      <p style={{ marginTop: "10px" }}>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

const formStyle = {
  maxWidth: "400px",
  margin: "40px auto",
  padding: "24px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  backgroundColor: "#fff"
};

const titleStyle = {
  marginBottom: "16px",
  color: "#2a2a72"
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "6px"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#2a2a72",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};
