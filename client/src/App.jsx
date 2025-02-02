import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage/AboutPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const deletePost = (indexToDelete) => {
    setPosts(posts.filter((_, index) => index !== indexToDelete));
  };

  async function handleUpload(decodedUser) {
    try {
      const userData = {
        googleId: decodedUser.sub,
        email: decodedUser.email,
        displayName: decodedUser.name,
        firstName: decodedUser.given_name,
        lastName: decodedUser.family_name,
        picture: decodedUser.picture,
      };

      console.log("Uploading user data to MongoDB:", userData);

      const response = await fetch("http://localhost:9000/create-user", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error during user upload:", error);
    }
  }

  const handleLoginSuccess = (credentialResponse) => {
    console.log('Login successful:', credentialResponse);
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Decoded user:", decoded);
    const userObject = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };
    setUser(userObject);
    localStorage.setItem('user', JSON.stringify(userObject));
    handleUpload(decoded);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('User signed out');
  };

  return (
    <GoogleOAuthProvider clientId="484980379768-uc7nj2hgg3r6r0g05jfv4bij1k3d47dt.apps.googleusercontent.com">
      <Router>
        <AppContent user={user} handleLoginSuccess={handleLoginSuccess} handleLogout={handleLogout} posts={posts} addPost={addPost} deletePost={deletePost} />
      </Router>
    </GoogleOAuthProvider>
  );
}

function AppContent({ user, handleLoginSuccess, handleLogout, posts, addPost, deletePost }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app-container">
      {!isLoginPage && <Navbar user={user} />}

      {!isLoginPage && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
          {user ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'white',
              fontFamily: "'Lato', sans-serif",
              fontWeight: 600,
              fontSize: '16px',
              padding: '10px 15px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
            }}>
              <span>{user.name}</span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 16px',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: '#D12B2B',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')} />
          )}
        </div>
      )}

      <main>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/" element={user ? <Home posts={posts} deletePost={deletePost} /> : <Navigate to="/login" />} />
          <Route path="/post" element={user ? <PostPage posts={posts} addPost={addPost} deletePost={deletePost} /> : <Navigate to="/login" />} />
          <Route path="/search" element={user ? <SearchPage /> : <Navigate to="/login" />} />
          <Route path="/about" element={user ? <AboutPage /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;