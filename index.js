const express = require('express');
const app = express();
const keys = require('./keys.json');
let currentIndex = 0;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

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
