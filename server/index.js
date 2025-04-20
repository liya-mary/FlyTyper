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
    console.log("User connected ", socket.id); // Log the socket ID of the connected user

    socket.on('join', async room => {
        socket.join(room);
        const id = socket.id;
        console.log("id here: ", id);

        console.log(id + ' joined room: ' + room);
        let roomUsers = await io.in(room).fetchSockets()
        const socketIds = roomUsers.map(s => s.id);
        console.log("roomUsers: ", socketIds);
        // io.to(room).emit('receive_message', id);
        io.to(room).emit('userList', socketIds);

    });

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