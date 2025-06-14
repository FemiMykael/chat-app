// app.js
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// 1️⃣ Serve the homepage explicitly first
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 2️⃣ Serve all static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// 3️⃣ Socket.IO: handle chat messages
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// 4️⃣ Start the server (=> port 3000)
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

