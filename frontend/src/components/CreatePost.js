// src/pages/CreatePost.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';

export default function CreatePost() {
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [docFile, setDocFile] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [wordError, setWordError] = useState('');
  const imageInputRef = useRef();
  const docInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreviewUrl('');
    }
  }, [imageFile]);

  // update word count and validation
  useEffect(() => {
    const count = description.trim() === ''
      ? 0
      : description.trim().split(/\s+/).length;
    setWordCount(count);
    if (count > 100) {
      setWordError('Description cannot exceed 100 words.');
    } else {
      setWordError('');
    }
  }, [description]);

  const handleImageClick = () => imageInputRef.current.click();
  const handleDocClick = () => docInputRef.current.click();

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };
  const handleDocChange = e => {
    const file = e.target.files[0];
    if (file) setDocFile(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (wordCount > 100) return; // prevent submit when too many words

    const formData = new FormData();
    formData.append('description', description);
    if (imageFile) formData.append('image', imageFile);
    if (docFile) formData.append('document', docFile);

    try {
      await axios.post(
        'http://localhost:8081/api/posts',
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      navigate('/post');
    } catch (err) {
      console.error('Failed to create post:', err);
      alert('Error creating post. See console for details.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Create New Post</h2>

      {/* Attach controls */}
      <div style={{ marginBottom: 12, fontSize: 14 }}>
        <span
          onClick={handleImageClick}
          style={{
            color: '#3182ce',
            cursor: 'pointer',
            marginRight: 16,
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'underline'
          }}
        >
          <ImageIcon fontSize="small" style={{ marginRight: 4 }} />
          Add Image
        </span>

        <span
          onClick={handleDocClick}
          style={{
            color: '#3182ce',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'underline'
          }}
        >
          <DescriptionIcon fontSize="small" style={{ marginRight: 4 }} />
          Add Document
        </span>

        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          ref={docInputRef}
          style={{ display: 'none' }}
          onChange={handleDocChange}
        />
      </div>

      {/* Live image preview */}
      {imagePreviewUrl && (
        <img
          src={imagePreviewUrl}
          alt="Preview"
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: 200,
            marginBottom: 12,
            borderRadius: 4,
            objectFit: 'contain'
          }}
        />
      )}

      {/* Filename preview for document */}
      {docFile && (
        <div style={{ marginBottom: 16, fontSize: 13 }}>
          📄 {docFile.name}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Write your post..."
          style={{ width: '100%', height: 120, marginBottom: 8, padding: 8 }}
          required
        />

        <div style={{ marginBottom: 8, fontSize: 12, color: wordError ? '#e53e3e' : '#666' }}>
          Word count: {wordCount}/100{wordError && ` — ${wordError}`}
        </div>

        <button
          type="submit"
          disabled={wordCount > 100}
          style={{
            padding: '8px 16px',
            background: wordCount > 100 ? '#ccc' : '#3182ce',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: wordCount > 100 ? 'not-allowed' : 'pointer'
          }}
        >
          Create
        </button>
      </form>
    </div>
  );
}