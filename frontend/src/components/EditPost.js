import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPost() {
  const { id } = useParams();
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8081/api/posts/${id}`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Post not found');
        return res.json();
      })
      .then(post => setDescription(post.description))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:8081/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ description })
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to update');
      return res.json();
    })
    .then(() => navigate('/post'))
    .catch(err => console.error(err));
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: '100%', height: 100, marginBottom: '1rem' }}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}