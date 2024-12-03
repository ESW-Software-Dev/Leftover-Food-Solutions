import React, { useState } from 'react';
import PostForm from '../components/PostForm';
import '../App.css'; // Ensure the CSS file is imported

const PostPage = ({ addPost, deletePost }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="post-page-container">
      <h1 className="post-page-header">Post Food</h1>
      <button className="add-post-button" onClick={() => setIsFormOpen(true)}>
        Add New Post
      </button>
      {isFormOpen && (
        <PostForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} addPost={addPost} />
      )}
    </div>
  );
};

export default PostPage;
