import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 20px',
      backgroundColor: '#2a2a72',
      color: 'white',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        {token && <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>}
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        {token ? (
          <button onClick={logout} style={{
            background: 'transparent',
            border: '1px solid white',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
