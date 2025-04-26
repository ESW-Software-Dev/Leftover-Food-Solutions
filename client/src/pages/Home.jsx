import React, { useState, useEffect } from "react";
import "../App.css";
import "./Home.css";
import "./SearchPage.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  // const fetchPosts = async (userId) => {
  //   try {
  //     const response = await fetch(
  //       `https://leftover-food-solutions.onrender.com/get-users-posts/${userId}`,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const result = await response.json();
  //     if (result.success) {
  //       setPosts(result.data);
  //     } else {
  //       setError("No posts found");
  //     }
  //   } catch (err) {
  //     setError("Failed to fetch posts");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch posts from the API when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:9000/get-all-posts");
        const result = await response.json();

        if (result.success) {
          setPosts(result.data); // Set the posts from API response
        } else {
          setError("No posts found");
        }
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false); // Stop loading whether success or error
      }
    };

    fetchPosts();
  }, []); // Empty array means this runs only once after the component mounts

  // Filter posts based on search term (foodType or location)
  const filteredPosts = posts.filter(
    (post) =>
      post.foodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If loading, show a loading message
  if (loading) {
    return <div>Loading posts...</div>;
  }

  // If there's an error, show an error message
  if (error) {
    return <div>{error}</div>;
  }

  // // Function to delete a post
  // const deletePost = async (postId) => {
  //   try {
  //     const response = await fetch(
  //       `https://leftover-food-solutions.onrender.com/delete-post/${postId}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );
  //     const result = await response.json();
  //     if (result.success) {
  //       // Update the posts state to remove the deleted post
  //       setPosts((prevPosts) =>
  //         prevPosts.filter((post) => post._id !== postId)
  //       );
  //     } else {
  //       setError("Failed to delete post");
  //     }
  //   } catch (error) {
  //     setError("An error occurred while deleting the post");
  //   }
  // };

  return (
    <div className="home-container">
      <div className="home-title">
        <img src="../dist/eswlogo.png" className="home-logo"></img>{" "}
        <div>
          <p>WE ARE...</p>
          <bold>Leftover Food Solutions</bold>
          <p>AT CORNELL ESW</p>
        </div>
      </div>

      <div className="search-bar">
        <span class="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="Search by food type or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* <div className="welcome-section">
        <h1 className="dynamic-text">
          Welcome to <span className="highlight">Leftover Food Solutions</span>
        </h1>
    
        <p className="blurb">
          Discover and share leftover food across campus! Below, you'll find
          your recent posts. Use the tabs above to add or search for food and
          join us in reducing food waste. Learn more about us on the About Us
          page.
        </p>
      </div> */}

      {/* Posts Section
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
                <button
                  className="delete-button"
                  onClick={() => deletePost(post._id)}
                >
                  Delete Post
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts available.</p>
        )}
      </div> */}

      <div className="search-results">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div key={index} className="post-item">
              <h3>{post.foodType}</h3>
              <img
                src={post.imageURL}
                alt={post.foodType}
                // style={{
                //   width: "50%",
                //   height: "auto",
                //   borderRadius: "10px",
                //   marginBottom: "10px",
                // }}
              />
              {/* <p>
                By {post.name} ({post.organization})
              </p> */}
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

export default Home;
