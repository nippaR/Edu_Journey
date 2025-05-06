import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:8081/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ description })
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to create post');
      return res.json();
    })
    .then(() => navigate('/post'))
    .catch(err => console.error(err));
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Write your post..."
          style={{ width: '100%', height: 100, marginBottom: '1rem' }}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}