const express = require('express');
const app = express();
const keys = require('./keys.json');
let currentIndex = 0;

app.get('/', (req, res) => {
  const key = keys[currentIndex];
  currentIndex = (currentIndex + 1) % keys.length;
  
  res.setHeader('Content-Type', 'text/plain');
  res.send(key);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Key rotation service running on port ${PORT}`);
});
