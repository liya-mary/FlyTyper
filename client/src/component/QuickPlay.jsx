import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Typer from './Typer';
// import axios from 'axios'; // Import axios for API requests

const socket = io.connect('http://localhost:3000');



export default function QuickPlay() {
    const [gameFinish, setGameFinish] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [roomData, setRoomData] = useState({});
    const [users, setUsers] = useState({});

    // Function to send a message
    // const sendMessage = async () => {

    //     // Emit a socket event with the message details
    //     socket.emit("send_message", {
    //         senderId: "123",     // ID of the sender
    //         receiverId: "456", // ID of the receiver
    //         message: "Hello"   // The actual message content
    //     });
    // }

    const handleGameFinish = () => {
        setGameFinish(true);
        socket.emit("leave", "My room");

    }
    const handleProgress = (progress) => {
        socket.emit("trackProgress", progress);
    }

    const handleWpm = (currWpm) => {
        socket.emit("trackWpm", currWpm);
    }

    useEffect(() => {
        if (socket) {
            socket.emit('join', "My room");
        }
    }, [])

    useEffect(() => {
        if (gameFinish) {
            const timeTaken = Date.now() - startTime;
            socket.emit('gameFinish', socket.id, timeTaken);
        }

    }, [gameFinish])

    useEffect(() => {
        socket.on("roomData", (data) => {
            console.log("roomData ", data);
            setRoomData(data);
            console.log("userss: ", data.users);
            setUsers(data.users);
        })

    }, [])

    useEffect(() => {
        const now = Date.now();
        const delay = roomData.startTime - now;
        console.log("delay : ", delay);

        if (delay > 0) {
            setTimeout(() => {
                setGameStarted(true);
            }, delay)
        }

    }, [roomData.startTime])

    useEffect(() => {
        socket.on("user left", (data) => {
            console.log("socket left ", data);
        })

    }, [])


    return (
        <>
            <div>
                {
                    Object.keys(users).length > 0 ? (
                        Object.keys(users).map((userid) => {
                            return <div key={userid}>
                                {userid === socket.id ? (
                                    <>
                                        <progress value={roomData.users[userid].userProgress} max={100} />
                                        <li>your wpm: {roomData.users[userid].userWpm}</li>
                                        {/* Ai */}
                                        {roomData.users[userid]?.rank != null && (
                                            <h5>Rank: {roomData.users[userid].rank}</h5>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <progress value={roomData.users[userid].userProgress} max={100} />
                                        <li>Guest wpm: {roomData.users[userid].userWpm}</li>
                                        {roomData.users[userid]?.rank != null && (
                                            <h5>Rank: {roomData.users[userid].rank}</h5>
                                        )}
                                    </>
                                )}
                            </div>
                        })
                    ) : (
                        <p></p>
                    )
                }
            </div>
            <div>
                <Typer randomParagraph={roomData.roomParagraph}
                    gameFinish={gameFinish} handleGameFinish={handleGameFinish} wpm={roomData.users?.[socket.id]?.userWpm} handleWpm={handleWpm} progress={0} handleProgress={handleProgress} startTime={roomData.startTime} gameStarted={gameStarted} />
            </div>

        </>

    );
}