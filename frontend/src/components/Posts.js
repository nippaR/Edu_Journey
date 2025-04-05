// frontend/src/components/Posts.js
import React, { useState, useEffect } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      <h2>Posts Feed</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <div key={post.id}>
            <p>{post.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Posts;
