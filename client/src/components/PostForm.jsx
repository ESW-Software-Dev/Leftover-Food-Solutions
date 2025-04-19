import React, { useState, useEffect, useCallback } from 'react';
import './PostForm.css';

const PostForm = ({ addPost }) => {
  const [user, setUser] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    location: '',
    date: '',
    time: '',
    foodType: '',
    servings: 0,
    image: null,
    availability: true,
  });

  const [errors, setErrors] = useState({});

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };
  
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      // Check if file is an image
      if (file.type.startsWith('image/')) {
        setFormData({ ...formData, image: file });
        
        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      if (files && files.length > 0) {
        setFormData({ ...formData, image: files[0] });
        
        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setPreviewImage(null);
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
      newErrors.servings = 'Number of servings needs to be greater than 0';
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
      formDataToSend.append('user_id', user ? user._id : '');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('organization', formData.organization);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('foodType', formData.foodType);
      formDataToSend.append('servings', formData.servings);
      formDataToSend.append('time', formData.time);
      formDataToSend.append('image', formData.image);
      
      const result = await fetch("http://localhost:9000/upload-post", {
        method: 'POST',
        body: formDataToSend,
      });
      const data = await result.json();
      console.log(data);
      if (data.success) {
        addPost(data.post);
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
        time: '',
        foodType: '',
        servings: 0,
        image: null,
        availability: true,
      });
      setPreviewImage(null);
    }
  };

  return (
    <div className="post-form-container">
      <div className="post-form-content">
        {/* Image Drop Zone - Left Side */}
        <div 
          className={`image-drop-container ${isDragging ? 'drag-over' : ''}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {previewImage ? (
            <div className="preview-container">
              <img src={previewImage} alt="Preview" className="image-preview" />
              <button 
                type="button" 
                className="remove-image-btn" 
                onClick={removeImage}
              >
                Remove Image
              </button>
            </div>
          ) : (
            <div className="upload-prompt">
              <div className="drag-instructions">
                <p>Drag & drop an image here</p>
                <p>- or -</p>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="file-input"
                />
              </div>
              {errors.image && <span className="error">{errors.image}</span>}
            </div>
          )}
        </div>
        
        {/* Form Inputs - Right Side */}
        <div className="form-inputs-container">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="organization"
                placeholder="Organization"
                value={formData.organization}
                onChange={handleChange}
                className="form-input"
              />
              {errors.organization && <span className="error">{errors.organization}</span>}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="form-input"
              />
              {errors.location && <span className="error">{errors.location}</span>}
            </div>

            <div className="input-group">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
              />
              {errors.date && <span className="error">{errors.date}</span>}
            </div>

            <div className="input-group">
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="form-input"
              />
              {errors.time && <span className="error">{errors.time}</span>}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="foodType"
                placeholder="Food Type"
                value={formData.foodType}
                onChange={handleChange}
                className="form-input"
              />
              {errors.foodType && <span className="error">{errors.foodType}</span>}
            </div>

            <div className="input-group">
              <input
                type="number"
                name="servings"
                placeholder="Number of Servings"
                value={formData.servings}
                onChange={handleChange}
                className="form-input"
              />
              {errors.servings && <span className="error">{errors.servings}</span>}
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;