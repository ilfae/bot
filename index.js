const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const keys = require('./wof.json');
let currentIndex = 0;

// Middleware для скрытия содержимого
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

app.get('/', (req, res) => {
  const key = keys[currentIndex];
  
  // Ротация ключей
  currentIndex = (currentIndex + 1) % keys.length;
  
  // Возвращаем ключ в "скрытом" формате
  res.send(`<!-- ${key} -->`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Key rotation service running on port ${PORT}`);
});
