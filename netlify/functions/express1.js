const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Route to get posts from JSONPlaceholder
app.get('/posts', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Route to get a single post by ID
app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error.message);
    res.status(500).json({ error: `Failed to fetch post with ID ${id}` });
  }
});

// Route to create a new post
app.post('/posts', async (req, res) => {
  const newPost = req.body;
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
