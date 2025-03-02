import React, { useState, useEffect } from 'react';
import '../App.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const fetchPosts = async (userId) => {
    try {
        const response = await fetch(`http://localhost:9000/get-users-posts/${userId}`, {
          method: 'GET'
        });
        const result = await response.json();
        if (result.success) {
          setPosts(result.data);
        } else {
          setError('No posts found');
        }
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser)
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser);
      console.log(parsedUser)
      fetchPosts(parsedUser._id);
    }
  }, []);

  // Function to delete a post
  const deletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:9000/delete-post/${postId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        // Update the posts state to remove the deleted post
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } else {
        setError('Failed to delete post');
      }
    } catch (error) {
      setError('An error occurred while deleting the post');
    }
  };

  return (
    <div className="home-container">
      {/* Dynamic Typing Section */}
      <div className="welcome-section">
        <h1 className="dynamic-text">
          Welcome to <span className="highlight">Leftover Food Solutions</span>
        </h1>
        <p className="blurb">
          Discover and share leftover food across campus! Below, you'll find your recent posts. Use the tabs above to add or search for food and join us in reducing food waste. Learn more about us on the About Us page.
        </p>
      </div>

      {/* Posts Section */}
      <div className="posts-section">
        <h2>Your Posts</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : posts.length > 0 ? (
          <div className="posts-grid">
            {posts.map((post, index) => (
              <div key={index} className="post-card">
                <h3>{post.foodType}</h3>
                <p>
                  <strong>By:</strong> {post.name} ({post.organization})
                </p>
                <p>
                  <strong>Location:</strong> {post.location}
                </p>
                <p>
                  <strong>Time:</strong> {post.time}
                </p>
                <button className="delete-button" onClick={() => deletePost(post._id)}>
                  Delete Post
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;