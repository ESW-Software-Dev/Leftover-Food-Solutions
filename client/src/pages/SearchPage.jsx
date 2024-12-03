import React, { useState, useEffect } from 'react';
import '../App.css'; // Assuming your styles are here

const SearchPage = () => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term
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
  }, []); // Empty array means this runs only once after the component mounts

  // Filter posts based on search term (foodType or location)
  const filteredPosts = posts.filter(
    post =>
      post.foodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If loading, show a loading message
  if (loading) {
    return (
      <div className="search-page">
        <h1 className="page-title">Search Food</h1>
        <div>Loading posts...</div>
      </div>
    );
  }

  // If there's an error, show an error message
  if (error) {
    return (
      <div className="search-page">
        <h1 className="page-title">Search Food</h1>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="search-page">
      {/* Title always visible */}
      <h1 className="page-title">Search Food</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by food type or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Search results */}
      <div className="search-results">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div key={index} className="post-item">
              <h3>{post.foodType}</h3>
              <img
                src={post.imageURL}
                alt={post.foodType}
                style={{
                  width: '50%',
                  height: 'auto',
                  borderRadius: '10px',
                  marginBottom: '10px',
                }}
              />
              <p>By {post.name} ({post.organization})</p>
              <p>Location: {post.location}</p>
              <p>Time: {post.time}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;








