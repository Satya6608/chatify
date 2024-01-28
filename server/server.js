// server.js
const express = require('express');
const http = require('http');
const bodyParser = require("body-parser");
const cors = require("cors")
const socketIO = require('socket.io');
const authRoutes = require("./routes/authRoutes");
const { connectToDatabase } = require("./utils/dbConnection");
const env = require("dotenv")

const app = express();

const PORT = 3000;
const server = http.createServer(app);
// Connect to the database
connectToDatabase();
// Middleware
app.use(cors());
app.use(bodyParser.json());
// Routes
app.use("/api", authRoutes);

const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST'],
  },
});


io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for incoming messages from clients
  socket.on('message', (message) => {
    console.log('Message received:', message);

    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
