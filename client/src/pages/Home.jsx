import React, { useState, useEffect } from 'react';
import '../App.css';

const Home = () => {
  const [testMessage, setTestMessage] = useState("None");
  const [posts, setPosts] = useState([]); // State for posts

  function callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setTestMessage(res))
      .catch(err => setTestMessage("ERROR"));
  }

  useEffect(() => {
    callAPI();
    fetchPosts(); // Fetch posts on mount
  }, []);

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:9000/get-all-posts');
      const result = await response.json();
      if (result.success) {
        setPosts(result.data); // Set posts to state
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  // Function to delete a post
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:9000/delete-post/${postId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        // Remove the deleted post from the state
        setPosts(posts.filter(post => post.id !== postId));
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Leftover Food Solutions</h1>

      <div className="blurb-container">
        <p className="blurb">
          This platform is to share and find leftover food from campus events in hopes of reducing food waste across campus.
        </p>
      </div>

      <div className="your-posts">
        <h2>Your Posts</h2>
        <div className="posts-container">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-item">
                <h3>{post.foodType}</h3>
                <p>By {post.name} ({post.organization})</p>
                <p>Location: {post.location}</p>
                <p>Time: {post.time}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDeletePost(post.id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;




