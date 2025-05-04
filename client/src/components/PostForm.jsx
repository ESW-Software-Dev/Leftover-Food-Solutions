import React, { useState, useEffect, useCallback } from 'react';
import './PostForm.css';

const PostForm = ({ addPost }) => {
  const [user, setUser] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    location: '',
    foodType: '',
    description: '',
    duration: '',
    image: null,
    availability: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(prev => ({ ...prev, name: parsedUser.displayName || '' }));
    }
  }, []);

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
      if (file.type.startsWith('image/')) {
        setFormData({ ...formData, image: file });
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
      }
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === 'file') {
      if (files && files.length > 0) {
        setFormData({ ...formData, image: files[0] });
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(files[0]);
      }
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
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

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.foodType.trim()) newErrors.foodType = 'Food type is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.duration || isNaN(Number(formData.duration)) || Number(formData.duration) <= 0) {
      newErrors.duration = 'Duration must be a positive number';
    }
    if (!formData.image) newErrors.image = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleUpload() {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('user', user ? user._id : '');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('organization', formData.organization);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('foodType', formData.foodType);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('duration', Number(formData.duration) * 60 * 1000); // assuming user enters minutes, convert to milliseconds
      // formDataToSend.append('availability', formData.availability);
      formDataToSend.append('image', formData.image);

      const result = await fetch("https://leftover-food-solutions.onrender.com/upload-post", {
        method: 'POST',
        body: formDataToSend,
      });
      const data = await result.json();
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
        foodType: '',
        description: '',
        duration: '',
        image: null,
        availability: true,
      });
      setPreviewImage(null);
    }
  };

  return (
    <div className="post-form-container">
      <div className="post-form-content">
        
        {/* Left side - Image upload */}
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
              <button type="button" className="remove-image-btn" onClick={removeImage}>Remove Image</button>
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

        {/* Right side - Form */}
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
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
              />
              {errors.description && <span className="error">{errors.description}</span>}
            </div>

            <div className="input-group">
              <input
                type="number"
                name="duration"
                placeholder="Duration (minutes)"
                value={formData.duration}
                onChange={handleChange}
                className="form-input"
              />
              {errors.duration && <span className="error">{errors.duration}</span>}
            </div>

            {/* <div className="input-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="availability"
                  checked={formData.availability}
                  onChange={handleChange}
                />
                Available
              </label>
            </div> */}

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
