import React, { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from backend API when the component loads
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://leftover-food-solutions.onrender.com/get-all-posts');
        const result = await response.json();
        if (result.success) {
          setPosts(result.data); // Set posts to state
        } else {
          setError('No posts found');
        }
      } catch (error) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array to run only on initial mount

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {posts.map(post => (
          <div key={post._id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;