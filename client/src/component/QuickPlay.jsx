import React, { useEffect, useState } from 'react'; // Import necessary modules from React
import io from 'socket.io-client'; // Import the socket.io client library
import Typer from './Typer';
// import axios from 'axios'; // Import axios for API requests

// Establish a socket connection to the server at the specified URL
const socket = io.connect('http://localhost:3000');

// let receiveMessage;
// 
export default function QuickPlay() {
    const [userId, setUserId] = useState();
    const [userList, setUserList] = useState([]);


    // Function to send a message
    // const sendMessage = async () => {

    //     // Emit a socket event with the message details
    //     socket.emit("send_message", {
    //         senderId: "123",     // ID of the sender
    //         receiverId: "456", // ID of the receiver
    //         message: "Hello"   // The actual message content
    //     });
    // }

    useEffect(() => {
        if (socket) {
            socket.emit('join', "My room");
        }
    }, [])


    useEffect(() => {
        socket.on("userList", (data) => {
            console.log("userList: ", data);
            setUserList(data);
        })
    },)


    return (
        <>
            <div>
                {
                    userList.length > 0 &&
                    userList.map((user) => {
                        console.log("user ids map: ", user)
                        return <li key={user}>Guest:{user === socket.id ? "you" : user}</li>
                    })

                }
            </div>
            <div>
                <Typer />
            </div>

        </>

    );
}