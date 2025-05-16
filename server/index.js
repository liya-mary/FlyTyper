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


const roomData = {};


io.on('connection', socket => {
    //On join room
    console.log("User connected ", socket.id);

    socket.on('join', async () => {
        let room = Object.keys(roomData)
            .find((key) => {
                return roomData[key].gameStarted == false;
            });
        if (room == undefined) {
            room = "room" + Object.keys(roomData).length
        }
        socket.join(room);


        if (!roomData[room]) {
            const countDown = 10;
            const startTime = Date.now() + countDown * 1000;
            setTimeout(() => {
                console.log("starting the game");
                roomData[room].gameStarted = true;
            }, countDown * 1000);
            const paragraphList = JSON.parse(fs.readFileSync('./message.json', 'utf-8'));
            const randomIndex = Math.floor(Math.random() * paragraphList.length);
            const randomPara = paragraphList[randomIndex].text;
            console.log("random para server: ", randomPara);

            roomData[room] = { //AI code
                startTime: startTime,
                gameStarted: false,
                roomParagraph: randomPara,
                users: {
                    // abc: { time: 0 }

                }
            }
        }


        const id = socket.id;
        console.log("id here: ", id);
        console.log(id + ' joined room: ' + room);

        roomData[room].users[id] = {};
        roomData[room].users[id].userWpm = 0;
        roomData[room].users[id].userProgress = 0;


        console.log("user updated: ", roomData[room]);


        io.to(room).emit('roomData', roomData[room]);


        //game Finish
        // .=>string []-variable
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
            roomData[room].users[socket.id].userWpm = currWpm;
            // console.log("curr wpm in server: ", roomData[room].users[socket.id].userWpm);
            io.to(room).emit('roomData', roomData[room]);

        })

        socket.on("trackProgress", (currProgress) => {
            roomData[room].users[socket.id].userProgress = currProgress;
            // console.log("currprogress in server: ", roomData[room].users[socket.id].userProgress);
            io.to(room).emit('roomData', roomData[room]);

        })

    });
    socket.on('leave', function () {
        console.log("leave");
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


db.sequelize.sync().then(() => {
    console.log("SQL database is connected");
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});