import React, { useState } from 'react';
import '../App.css';

const PostForm = ({ isOpen, onClose, addPost }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    location: '',
    date: '',
    foodType: '',
    images: [''],
    availability: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleUpload () {
    try {
      console.log(formData)
      const result = await fetch("http://localhost:9000/upload-post", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      console.log("HI")
      const data = await result.json();
      console.log(data);
    } catch(error) {
      console.error(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpload();
    setFormData({ 
      name: '',
      organization: '',
      location: '',
      date: '',
      foodType: '',
      images: [''],
      availability: true, 
    });
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
          {/* <input type="time" name="time" value={formData.time} onChange={handleChange} /> */}
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PostForm;




