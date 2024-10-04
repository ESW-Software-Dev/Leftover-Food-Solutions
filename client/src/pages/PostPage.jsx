import React, { useState } from 'react';
import PostForm from '../components/PostForm';

const PostPage = ({ posts, addPost, deletePost }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <h1>Post Page</h1>
      <button onClick={() => setIsFormOpen(true)}>Add New Post</button>
      <PostForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} addPost={addPost} />
      <div>
        {posts.map((post, index) => (
          <div key={index} className="post-item">
            <h3>{post.foodType}</h3>
            <p>By {post.name} ({post.organization})</p>
            <p>Location: {post.location}</p>
            <p>Time: {post.time}</p>
            <button onClick={() => deletePost(index)}>Delete Post</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
