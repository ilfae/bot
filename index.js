const express = require('express');
const app = express();
const keys = require('./keys.json');
let currentIndex = 0;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

app.get('/', (req, res) => {
  const key = keys[currentIndex];
  currentIndex = (currentIndex + 1) % keys.length;
  
  res.send(`<!-- ${key} -->`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Key rotation service running on port ${PORT}`);
});
