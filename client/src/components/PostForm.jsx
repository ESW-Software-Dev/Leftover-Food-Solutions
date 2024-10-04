import React, { useState } from 'react';
import '../App.css';

const PostForm = ({ isOpen, onClose, addPost }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    foodType: '',
    time: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
    setFormData({ name: '', organization: '', foodType: '', time: '', location: '' });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add a Post</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input type="text" name="organization" placeholder="Organization" value={formData.organization} onChange={handleChange} />
          <input type="text" name="foodType" placeholder="Food Type" value={formData.foodType} onChange={handleChange} />
          <input type="time" name="time" value={formData.time} onChange={handleChange} />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PostForm;