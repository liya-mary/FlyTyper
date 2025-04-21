require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const db = require('./database');
const fs = require('fs');
const user = require('./model/user');

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

const roomParagraphs = {};
const usersWpm = {};
const usersProgress = {};
const roomData = {};


io.on('connection', socket => {
    //On join room
    console.log("User connected ", socket.id); // Log the socket ID of the connected user

    socket.on('join', async room => {
        socket.join(room);
        if (!roomData[room]) {
            const countDown = 10;
            const startTime = Date.now() + countDown * 1000;
            roomData[room] = { //AI code
                startTime: startTime,
                gameStarted: false,
                users: {
                    // abc: { time: 0 }

                }
            }
        }


        const id = socket.id;
        console.log("id here: ", id);
        roomData[room].users[id] = {};
        console.log("user updated: ", roomData[room]);
        usersWpm[socket.id] = 0;
        usersProgress[socket.id] = 0;


        console.log(id + ' joined room: ' + room);
        let roomUsers = await io.in(room).fetchSockets()
        const socketIds = roomUsers.map(s => s.id);
        console.log("roomUsers: ", socketIds);
        // io.to(room).emit('receive_message', id);


        // if (!roomData[room].gameStarted) {
        //     // roomData[room].gameStarted = true;
        //     const countDown = 10;
        //     const startTime = Date.now() + countDown * 1000;
        //     console.log("start time: ", startTime);
        //     roomData[room].startTime = startTime;
        //     io.to(room).emit("startTime", startTime);
        // }

        //fetching random para
        io.to(room).emit('userList', socketIds);
        if (!roomParagraphs[room]) {
            const paragraphList = JSON.parse(fs.readFileSync('./message.json', 'utf-8'));
            const randomIndex = Math.floor(Math.random() * paragraphList.length);
            const randomPara = paragraphList[randomIndex].text;
            console.log("random para server: ", randomPara);
            roomParagraphs[room] = "Test message";
        }

        io.to(room).emit('randomPara', roomParagraphs[room]);
        //game Finish
        socket.on("gameFinish", (userId, timeTaken) => {
            const currUser = roomData[room].users[userId];
            console.log("curr user id : ", currUser);
            currUser["timeTaken"] = timeTaken;
            console.log("time taken by id: ", currUser["timeTaken"]);
            const users = roomData[room].users;
            console.log("users:", users);

            Object.keys(users).filter((key) => {
                return users[key].timeTaken;

            }).sort((a, b) => {
                console.log("a sort: ", a, "b sort: ", b);
                return users[a].timeTaken - users[b].timeTaken;
            }).map((userId, index) => {
                console.log("user from map: ", userId);

                users[userId]["rank"] = index + 1;
                console.log("user ranks: ", users[userId]["rank"]);
            })




            io.to(room).emit('roomData', roomData[room]);
        })



        socket.on("trackWpm", (currWpm) => {
            usersWpm[socket.id] = currWpm;
            io.to(room).emit('usersWpm', usersWpm);
        })

        socket.on("trackProgress", (currProgress) => {
            usersProgress[socket.id] = currProgress;
            io.to(room).emit('usersProgress', usersProgress);
        })

        io.to(room).emit('roomData', roomData[room]);




    });
    socket.on('leave', function (room) {
        // try {
        //     console.log('[socket]', 'leave room :', room);
        //     socket.leave(room);
        //     socket.to(room).emit('user left', socket.id);
        // } catch (e) {
        //     console.log('[error]', 'leave room :', e);
        //     socket.emit('error', 'couldnt perform requested action');
        // }
    })



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
});