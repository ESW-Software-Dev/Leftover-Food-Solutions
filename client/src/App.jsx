// App.jsx
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage/AboutPage';
import Navbar from './components/Navbar';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const deletePost = (indexToDelete) => {
    setPosts(posts.filter((_, index) => index !== indexToDelete));
  };

  async function handleUpload(user) {
    try {
      // Create a JSON object instead of FormData
      const formDataToSend = {
        googleId: user.sub,
        email: user.email,
        displayName: user.name,
        firstName: user.given_name,
        lastName: user.family_name,
        picture: user.picture // Assuming this is a URL, not a file
      };
  
      console.log("Created JSON Data", formDataToSend);
  
      const result = await fetch("http://localhost:9000/create-user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the appropriate header
        },
        body: JSON.stringify(formDataToSend), // Convert the object to a JSON string
      });
  
      const data = await result.json();
      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error during upload:", error);
    }
  }

  const handleLoginSuccess = (credentialResponse) => {
    console.log('Login successful:', credentialResponse);

    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded)
    const userObject = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };
    setUser(userObject);
    console.log("Uploading to MongoDB")
    handleUpload(decoded)
  };

  const handleLogout = () => {
    setUser(null);
    console.log('User signed out');
  };

  return (
    <GoogleOAuthProvider clientId="484980379768-uc7nj2hgg3r6r0g05jfv4bij1k3d47dt.apps.googleusercontent.com">
      <Router>
        <div className="app-container">
          <Navbar user={user} />
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
                ':hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.05)'
                }
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
                    ':hover': {
                      backgroundColor: '#C72B2B',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ padding: '2px' }}>
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </div>
            )}
          </div>
          <main>
            <Routes>
              <Route path="/" element={<Home posts={posts} deletePost={deletePost} />} />
              <Route path="/post" element={<PostPage posts={posts} addPost={addPost} deletePost={deletePost} />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
