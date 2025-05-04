import React, { useState, useEffect } from "react";
import "../App.css";
import "./Profile.css";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [saved, setSavedPosts] = useState([]);
  const [claimed, setClaimedPosts] = useState([]);

  const fetchPosts = async (userId) => {
    try {
      const response = await fetch(
        `https://leftover-food-solutions.onrender.com/get-users-posts/${userId}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      if (result.success) {
        setPosts(result.data);
      } else {
        setError("No posts found");
      }
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedPosts = async (userId) => {
    try {
      const response = await fetch(
        `https://leftover-food-solutions.onrender.com/get-users-saved-posts/${userId}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      if (result.success) {
        setSavedPosts(result.data);
      } else {
        setError("No posts found");
      }
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const fetchClaimedPosts = async (userId) => {
    try {
      const response = await fetch(
        `https://leftover-food-solutions.onrender.com/get-users-claimed-posts/${userId}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      if (result.success) {
        setClaimedPosts(result.data);
      } else {
        setError("No posts found");
      }
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a post
  const deletePost = async (postId) => {
    try {
      const response = await fetch(
        `https://leftover-food-solutions.onrender.com/delete-post/${postId}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result.success) {
        // Update the posts state to remove the deleted post
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      } else {
        setError("Failed to delete post");
      }
    } catch (error) {
      setError("An error occurred while deleting the post");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchPosts(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchSavedPosts(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchClaimedPosts(user._id);
    }
  }, [user]);

  return (
    <div className="profile-container">
      {user ? (
        <>
          <div className="header">
            <img
              src={user.profilePicture}
              alt={`${user.displayName}'s profile`}
              className="profile-picture"
            />
            <div className="bio">
              <h2>{user.displayName}</h2>
              <div>
                <p>
                  <strong>{posts.length}</strong> Active Posts
                </p>
                <p>
                  <strong>{saved.length}</strong> Dishes Saved
                </p>
                <p>
                  <strong>{claimed.length}</strong> Claimed Dishes
                </p>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="posts-section">
            <h2>Posts</h2>
            <hr />
            {loading ? (
              <p>Loading posts...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : posts.length > 0 ? (
              <div className="posts-grid">
                {posts.map((post, index) => (
                  <div key={index} className="post-card">
                    <h3>{post.foodType}</h3>
                    <img src={post.imageURL} alt={post.foodType} />
                    <p>Location: {post.location}</p>
                    <p>Time: {post.time}</p>
                    {/* Uncomment if you want to show more details */}
                    {/* <p><strong>By:</strong> {post.name} ({post.organization})</p>
                  <p><strong>Location:</strong> {post.location}</p>
                  <p><strong>Time:</strong> {post.time}</p> */}
                    {/* Uncomment to enable deleting posts */}
                    {/* <button
                    className="delete-button"
                    onClick={() => deletePost(post._id)}
                  >
                    Delete Post
                  </button> */}
                  </div>
                ))}
              </div>
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
