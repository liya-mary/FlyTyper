import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Typer from './Typer';
// import axios from 'axios'; // Import axios for API requests

const socket = io.connect('http://localhost:3000');



export default function QuickPlay() {
    const [userList, setUserList] = useState([]);
    const [randomParagraph, setRandomParagraph] = useState();
    const [gameFinish, setGameFinish] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [userWpmList, setUserWpmList] = useState({});
    const [progress, setProgress] = useState(0);
    const [userProgressObj, setUserProgressObj] = useState({});


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
        console.log("new progress: ", progress);
        setProgress(progress);
        socket.emit("trackProgress", progress);
    }

    const handleWpm = (currWpm) => {
        // console.log("wpm from parent: ", currWpm);
        setWpm(currWpm);
        socket.emit("trackWpm", currWpm);

    }

    useEffect(() => {
        if (socket) {
            socket.emit('join', "My room");
        }
    }, [])
    useEffect(() => {
        socket.on("user left", (data) => {
            console.log("socket left ", data);
        })

    }, [])


    useEffect(() => {
        socket.on("userList", (data) => {
            console.log("userList: ", data);
            setUserList(data);
        })
    },)


    useEffect(() => {
        socket.on("usersWpm", (data) => {
            console.log("usersWpm: ", data);
            setUserWpmList(data);
        })
    }, [])

    useEffect(() => {
        socket.on("usersProgress", (data) => {
            console.log("usersProgress: ", data);
            setUserProgressObj(data);
        })
    }, [])

    useEffect(() => {
        socket.on("randomPara", (data) => {
            console.log("userList: ", data);
            setRandomParagraph(data);
        })
    },)

    return (
        <>
            <div>
                {
                    userList.length > 0 && Object.keys(userWpmList).length > 0 && Object.keys(userProgressObj).length > 0 ? (
                        userList.map((userid) => {
                            return <div key={userid}>
                                {userid === socket.id ? (
                                    <>
                                        <progress value={progress} max={100} />
                                        <li>your wpm: {wpm}</li>
                                    </>
                                ) : (
                                    <>
                                        <progress value={userProgressObj[userid]} max={100} />
                                        <li>Guest wpm: {userWpmList[userid]}</li>
                                    </>
                                )}
                            </div>
                        })
                    ) : (
                        <p>Uploading wpm...</p>
                    )
                }
            </div>
            <div>
                <Typer randomParagraph={randomParagraph}
                    gameFinish={gameFinish} handleGameFinish={handleGameFinish} wpm={wpm} handleWpm={handleWpm} progress={progress} handleProgress={handleProgress} />
            </div>

        </>

    );
}