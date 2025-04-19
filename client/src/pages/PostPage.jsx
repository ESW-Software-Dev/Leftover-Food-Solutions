import React, { useState } from 'react';
import PostForm from '../components/PostForm';
import './PostPage.css'; // Ensure the CSS file is imported

const PostPage = ({ addPost, deletePost }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="post-page-container">
      <h1 className="post-page-header">Create New Post</h1>
      <PostForm isOpen={true} onClose={() => setIsFormOpen(false)} addPost={addPost} />
    </div>
  );
};

export default PostPage;