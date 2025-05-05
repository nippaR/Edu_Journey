// frontend/src/components/Posts.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/posts', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(setPosts)
      .catch(err => console.error('Error loading posts:', err));
  }, []);

  const handleDelete = id => {
    if (!window.confirm('Delete this post?')) return;
    fetch(`http://localhost:8081/api/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        setPosts(posts.filter(p => p.id !== id));
      })
      .catch(err => console.error('Delete failed:', err));
  };

  // Style objects
  const styles = {
    container: {
      maxWidth: 600,
      margin: '2rem auto',
      padding: '0 1rem',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    title: {
      fontSize: '1.75rem',
      color: '#333'
    },
    newPostLink: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: '#3182ce',
      fontSize: '1rem'
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      backgroundColor: '#fff',
      transition: 'box-shadow 0.2s'
    },
    cardHover: {
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    description: {
      fontSize: '1rem',
      color: '#222',
      marginBottom: '1rem'
    },
    actions: {
      display: 'flex',
      gap: '0.5rem'
    },
    iconButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 4,
      display: 'flex',
      alignItems: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Posts feed </h2>
        <Link to="/posts/new" style={styles.newPostLink}>
          <AddBoxIcon fontSize="large" style={{ marginRight: 4 }} />
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: '#555', textAlign: 'center' }}>No posts available.</p>
      ) : (
        posts.map(post => (
          <div
            key={post.id}
            style={styles.card}
            onMouseEnter={e => Object.assign(e.currentTarget.style, styles.cardHover)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, { boxShadow: styles.card.boxShadow })}
          >
            <p style={styles.description}>{post.description}</p>
            <div style={styles.actions}>
              <Link to={`/posts/${post.id}/edit`} style={styles.iconButton} title="Edit">
                <EditIcon color="primary" />
              </Link>
              <button
                style={styles.iconButton}
                onClick={() => handleDelete(post.id)}
                title="Delete"
              >
                <DeleteIcon color="error" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}