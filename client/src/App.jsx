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

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const deletePost = (indexToDelete) => {
    setPosts(posts.filter((_, index) => index !== indexToDelete));
  };

  const handleLoginSuccess = (credentialResponse) => {
    console.log('Login successful:', credentialResponse);
    const userObject = {
      name: credentialResponse.profileObj.name,
      email: credentialResponse.profileObj.email,
      picture: credentialResponse.profileObj.picture,
    };
    setUser(userObject);
  };

  return (
    <GoogleOAuthProvider clientId="484980379768-uc7nj2hgg3r6r0g05jfv4bij1k3d47dt.apps.googleusercontent.com">
      <Router>
        <div className="app-container">
          <Navbar user={user} />
          <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '10px' }}>{user.name}</span>
                <img src={user.picture} alt={user.name} style={{ width: '40px', borderRadius: '20px' }} />
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
