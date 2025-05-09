// frontend/src/components/Notifications.js

import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAndMarkRead = async () => {
      try {
        // 1) Load all notifications
        const res = await fetch(
          'http://localhost:8081/api/notifications',
          { credentials: 'include' }
        );
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const list = await res.json();
        setNotifications(list);

        // 2) Mark all unread as read on the server
        const unread = list.filter(n => !n.read);
        await Promise.all(
          unread.map(n =>
            fetch(`http://localhost:8081/api/notifications/${n.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ read: true })
            })
          )
        );

        // 3) Reflect the change locally so the UI shows them as read
        setNotifications(prev =>
          prev.map(n => (n.read ? n : { ...n, read: true }))
        );
      } catch (err) {
        setError('Failed to load: ' + err.message);
      }
    };

    loadAndMarkRead();
  }, []);

  const toggleRead = (id, currentlyRead) => {
    fetch(`http://localhost:8081/api/notifications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ read: !currentlyRead })
    })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(updated =>
        setNotifications(notifications.map(n => (n.id === id ? updated : n)))
      )
      .catch(console.error);
  };

  const handleDelete = id => {
    if (!window.confirm('Delete this notification?')) return;
    fetch(`http://localhost:8081/api/notifications/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        setNotifications(notifications.filter(n => n.id !== id));
      })
      .catch(console.error);
  };

  // Style objects
  const styles = {
    container: {
      maxWidth: 600,
      margin: '2rem auto',
      fontFamily: 'Arial, sans-serif',
      padding: '0 1rem',
    },
    header: {
      fontSize: '1.75rem',
      color: '#00008B',
      marginBottom: '1rem',
    },
    error: {
      color: '#e53e3e',
      marginBottom: '1rem',
    },
    noNotif: {
      textAlign: 'center',
      color: '#555',
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      backgroundColor: '#fff',
      transition: 'background-color 0.3s',
    },
    cardUnread: {
      backgroundColor: '#eef7ff',
    },
    message: {
      fontSize: '1rem',
      fontWeight: 500,
      marginBottom: '0.5rem',
      color: '#222',
    },
    timestamp: {
      fontSize: '0.85rem',
      color: '#666',
      marginBottom: '1rem',
    },
    actions: {
      display: 'flex',
      gap: '0.5rem',
    },
    iconButton: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 4,
      display: 'flex',
      alignItems: 'center',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>My Notifications</h2>
      {error && <div style={styles.error}>{error}</div>}

      {notifications.length === 0 ? (
        <div style={styles.noNotif}>No notifications.</div>
      ) : (
        notifications.map(n => (
          <div
            key={n.id}
            style={{
              ...styles.card,
              ...(n.read ? {} : styles.cardUnread)
            }}
          >
            <div style={styles.message}>{n.message}</div>
            <div style={styles.timestamp}>
              {new Date(n.timestamp).toLocaleString()}
            </div>
            <div style={styles.actions}>
              <button
                style={styles.iconButton}
                onClick={() => toggleRead(n.id, n.read)}
                title={n.read ? 'Mark Unread' : 'Mark Read'}
              >
                {n.read
                  ? <MarkEmailUnreadIcon color="action" />
                  : <MarkEmailReadIcon color="primary" />
                }
              </button>
              <button
                style={styles.iconButton}
                onClick={() => handleDelete(n.id)}
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
