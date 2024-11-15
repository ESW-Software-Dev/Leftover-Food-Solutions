import React, { useState } from 'react';
import PostForm from '../components/PostForm';

const PostPage = ({ addPost, deletePost }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <h1>Post Page</h1>
      <button onClick={() => setIsFormOpen(true)}>Add New Post</button>
      <PostForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} addPost={addPost} />
    </div>
  );
};

export default PostPage;
