const express= require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes')
const messagesRoute = require('./routes/messagesRoute')
const path = require('path');
const socket = require('socket.io');

dotenv.config();

const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth',userRoutes)
app.use('/api/message',messagesRoute)

mongoose.connect(process.env.MONGO_URL,
    console.log("mongoose is connected"))
    .then(() => {
        const server = app.listen(9000, () => {
          console.log('Server is starting at port 9000');
        });
    
        const io = socket(server, {
          cors: {
            origin: 'http://localhost:5173',
            credentials: true,
          },
        });
    
        global.onlineUsers = new Map();
    
        io.on('connection', (socket) => {
          global.chatSocket = socket;
          socket.on('add-user', (userId) => {
            onlineUsers.set(userId, socket.id);
          });
          socket.on('send-msg', (data) => {
            const sendUserSocket = onlineUsers.get(data.to); // Fixed typo: onlineUser -> onlineUsers
            if (sendUserSocket) {
              socket.to(sendUserSocket).emit('msg-recieve', data.msg);
            }
          });
        });
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });