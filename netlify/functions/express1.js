const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello, World! from Express in Netlify" });
});

app.get('/api/greet/:name', (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}! Welcome to Netlify Functions with Express.` });
});

// Export handler
module.exports.handler = serverless(app);
