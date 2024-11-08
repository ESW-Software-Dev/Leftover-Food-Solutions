import React, { useState } from 'react';
import '../App.css';

const PostForm = ({ isOpen, onClose, addPost }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    location: '',
    date: '',
    time: '',
    foodType: '',
    servings: 0,
    images: [''],
    image: null, // Changed from images to image
    availability: true,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, image: e.target.files[0] }); // Set the image file
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

    if (formData.servings == 0) {
      newErrors.foodType = 'Number of servings needs to be greater than 0'
    }

    // Validate date (must be a valid date in the future)
    const currentDate = new Date();
    const selectedDate = new Date(formData.date);
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (isNaN(selectedDate.getTime()) || selectedDate < currentDate) {
      newErrors.date = 'Please enter a valid future date';
    }

    // Validate image (required)
    if (!formData.image) {
      newErrors.image = 'Image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleUpload() {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('organization', formData.organization);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('foodType', formData.foodType);
      formDataToSend.append('image', formData.image); // Append the image file

      const result = await fetch("http://localhost:9000/upload-post", {
        method: 'POST',
        body: formDataToSend,
      });
      const data = await result.json();
      console.log(data);
      if (data.success) {
        addPost(data.post); // Call the addPost function to update state in the parent component
      }
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
        image: null, // Reset image
        availability: true,
      });
      onClose();
    }
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '10px',
    width: '100%',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    cursor: 'pointer',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
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
            style={inputStyle}
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <input
            type="text"
            name="organization"
            placeholder="Organization"
            value={formData.organization}
            onChange={handleChange}
            style={inputStyle}

          />
          {errors.organization && <span className="error">{errors.organization}</span>}

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            style={inputStyle}

          />
          {errors.location && <span className="error">{errors.location}</span>}

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={inputStyle}

          />
          {errors.date && <span className="error">{errors.date}</span>}

          <input
            type="time"
            name="time"
            placeholder={formData.time}
            onChange={handleChange}
            style={inputStyle}

          />
          {errors.time && <span className='error'>{errors.time}</span>}

          <input
            type="text"
            name="foodType"
            placeholder="Food Type"
            value={formData.foodType}
            onChange={handleChange}
            style={inputStyle}

          />
          {errors.foodType && <span className="error">{errors.foodType}</span>}

          <input
            type="number"
            name="servings"
            placeholder="0"
            value={formData.servings}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.servings && <span className="error">{errors.servings}</span>}

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          
          {errors.image && <span className="error">{errors.image}</span>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
