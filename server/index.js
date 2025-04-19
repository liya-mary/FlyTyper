require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});


io.on('connection', socket => {
    //On join room
    socket.on('join', room => {
        socket.join(room);

        console.log(socket.id + ' joined room: ' + room);
        io.to(room).emit('receive_message', socket.id);
    });

    //On message send
    // socket.on('send_message', (data) => {
    //Log message
    //   console.log(data);

    //Emit to recipient

    // });
});


// // Listen for incoming Socket.IO connections
// io.on("connection", (socket) => {
//     console.log("User connected ", socket.id); // Log the socket ID of the connected user

//     // Listen for "send_message" events from the connected client
//     socket.on("send_message", (data) => {
//         console.log("Message Received ", data); // Log the received message data

//         // Emit the received message data to all connected clients
//         io.emit("receive_message", "recievde data meeh");
//     });
// });

db.sequelize.sync().then(() => {
    console.log("SQL database is connected");
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    // googleAuth(passport);
});