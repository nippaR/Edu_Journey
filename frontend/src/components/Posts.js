import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/posts', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = id => {
    if (!window.confirm('Delete this post?')) return;
    fetch(`http://localhost:8081/api/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(res => {
      if (!res.ok) throw new Error('Delete failed');
      setPosts(posts.filter(p => p.id !== id));
    })
    .catch(err => console.error(err));
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Posts Feed</h2>
      <Link to="/posts/new">+ New Post</Link>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} style={{
            border: '1px solid #ddd',
            padding: '1rem',
            margin: '1rem 0'
          }}>
            <p>{post.description}</p>
            <Link to={`/posts/${post.id}/edit`} style={{ marginRight: '1rem' }}>Edit</Link>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}