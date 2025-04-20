import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Typer from './Typer';
// import axios from 'axios'; // Import axios for API requests

const socket = io.connect('http://localhost:3000');



export default function QuickPlay() {
    const [userList, setUserList] = useState([]);
    const [userWpmList, setUserWpmList] = useState({});

    const [randomParagraph, setRandomParagraph] = useState();
    const [gameFinish, setGameFinish] = useState(false);
    const [wpm, setWpm] = useState(0);



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
    }, [wpm])

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
                    // userList.length > 0 &&
                    // userList.map((user) => {
                    //     console.log("user ids map: ", user)
                    //     return <li key={user}>{user === socket.id ? `your wpm: ${wpm}` : `Guest wpm: ${userWpmList[user]}`}</li>
                    // })

                    userList.length > 0 && Object.keys(userWpmList).length > 0 ? (
                        userList.map((userid) => {
                            console.log("user ids map: ", userid)
                            return <li key={userid}>{userid === socket.id ? `your wpm: ${wpm}` : `Guest wpm: ${userWpmList[userid]}`}</li>
                        })
                    ) : (
                        <p>Uploading wpm...</p>
                    )
                }
            </div>
            <div>
                <Typer randomParagraph={randomParagraph}
                    gameFinish={gameFinish} handleGameFinish={handleGameFinish} wpm={wpm} handleWpm={handleWpm} />
            </div>

        </>

    );
}