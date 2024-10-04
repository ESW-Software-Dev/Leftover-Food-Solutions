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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    // Validate name (required)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate organization (required)
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }

    // Validate location (required)
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    // Validate foodType (required)
    if (!formData.foodType.trim()) {
      newErrors.foodType = 'Food type is required';
    }

    // Validate date (must be a valid date in the future)
    const currentDate = new Date();
    const selectedDate = new Date(formData.date);
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (isNaN(selectedDate.getTime()) || selectedDate < currentDate) {
      newErrors.date = 'Please enter a valid future date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleUpload() {
    try {
      const result = await fetch("http://localhost:9000/upload-post", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await result.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
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
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add a Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
          
          <input
            type="text"
            name="organization"
            placeholder="Organization"
            value={formData.organization}
            onChange={handleChange}
          />
          {errors.organization && <span className="error">{errors.organization}</span>}
          
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <span className="error">{errors.location}</span>}
          
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <span className="error">{errors.date}</span>}

          <input
            type="text"
            name="foodType"
            placeholder="Food Type"
            value={formData.foodType}
            onChange={handleChange}
          />
          {errors.foodType && <span className="error">{errors.foodType}</span>}

          <button type="submit">Submit</button>
        </form>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PostForm;
