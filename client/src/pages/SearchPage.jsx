import React, { useState } from 'react';
import '../App.css';

const SearchPage = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(
    post =>
      post.foodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-page">
      <h1>Search for Food</h1>
      <input
        type="text"
        placeholder="Search by food type or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="search-results">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div key={index} className="post-item">
              <h3>{post.foodType}</h3>
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






