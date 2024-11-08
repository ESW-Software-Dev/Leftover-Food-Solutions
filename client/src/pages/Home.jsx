import React, { useState, useEffect } from 'react';
import '../App.css';

const Home = ({ deletePost }) => {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch posts from the API when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:9000/get-all-posts');
        const result = await response.json();
        if (result.success) {
          setPosts(result.data); // Set the posts from API response
        } else {
          setError('No posts found');
        }
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false); // Stop loading whether success or error
      }
    };

    fetchPosts();
  }, []); // Runs only once after the component mounts

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
      <h1>Welcome to Leftover Food Solutions</h1>
      <p>Find and share leftover food around campus!</p>

      {/* Conditional rendering for loading state */}
      {loading && <p>Loading posts...</p>}

      {/* Conditional rendering for error state */}
      {error && <div>{error}</div>}

      <h2>Your Posts</h2>
      <div>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="post-item">
              <h3>{post.foodType}</h3>
              <p>By {post.name} ({post.organization})</p>
              <p>Location: {post.location}</p>
              <p>Time: {post.time}</p>
              <button onClick={() => deletePost(index)}>Delete Post</button>
            </div>
          ))
        ) : (
          !loading && <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;




