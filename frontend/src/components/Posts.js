// frontend/src/components/Posts.js

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  // Base URL for your API server
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8081';

  useEffect(() => {
    // Clear stale posts whenever route (or login state) changes
    setPosts([]);

    // Fetch only the current user's posts
    fetch(`${API_BASE}/api/posts/mine`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(setPosts)
      .catch(err => console.error('Error loading posts:', err));
  }, [API_BASE, location]);

  const handleDelete = id => {
    if (!window.confirm('Delete this post?')) return;
    fetch(`${API_BASE}/api/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        setPosts(prev => prev.filter(p => p.id !== id));
      })
      .catch(err => console.error('Delete failed:', err));
  };

  // Helper to build full URL for images/docs
  const buildUrl = path => (path && (path.startsWith('http') ? path : `${API_BASE}${path}`));

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
    author: {
      fontSize: '0.85rem',
      color: '#555',
      marginBottom: '0.5rem'
    },
    image: {
      maxWidth: '100%',
      maxHeight: 300,
      marginBottom: '0.5rem',
      borderRadius: 4,
      objectFit: 'cover'
    },
    docLink: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      color: '#3182ce',
      textDecoration: 'underline'
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
        <h2 style={styles.title}>MY POSTS FEED</h2>
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
            <div style={styles.author}>Posted by: {post.author}</div>
            {post.imageUrl && (
              <img
                src={buildUrl(post.imageUrl)}
                alt="Post"
                style={styles.image}
              />
            )}
            <p style={styles.description}>{post.description}</p>
            {post.documentUrl && (
              <a
                href={buildUrl(post.documentUrl)}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.docLink}
              >
                Download Attachment
              </a>
            )}
            <div style={styles.actions}>
              <Link to={`/posts/${post.id}/edit`} style={styles.iconButton} title="Edit">
                <EditOutlinedIcon color="primary" />
              </Link>
              <button
                style={styles.iconButton} 
                onClick={() => handleDelete(post.id)}
                title="Delete"
              >
                <DeleteForeverIcon color="error" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}