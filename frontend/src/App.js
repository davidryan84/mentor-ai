import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateLessonPage from './pages/CreateLessonPage';
import './styles/index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="app">
        {isAuthenticated && (
          <nav className="navbar" style={{ backgroundColor: '#2D8B3D', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
            <div className="nav-container">
              <Link to="/" className="nav-logo" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>NSW Lesson Planner</Link>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link to="/create-lesson" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Create Lesson</Link>
              <button onClick={() => {
                setIsAuthenticated(false);
                setCurrentUser(null);
              }} style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
            </div>
          </nav>
        )}
        
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <DashboardPage user={currentUser} /> : <LoginPage setAuth={setIsAuthenticated} setUser={setCurrentUser} />}
          />
          <Route 
            path="/create-lesson" 
            element={isAuthenticated ? <CreateLessonPage user={currentUser} /> : <LoginPage setAuth={setIsAuthenticated} setUser={setCurrentUser} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
