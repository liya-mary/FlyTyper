import React, { useEffect, useState } from 'react'; // Import necessary modules from React
import io from 'socket.io-client'; // Import the socket.io client library
// import axios from 'axios'; // Import axios for API requests

// Establish a socket connection to the server at the specified URL
const socket = io.connect('http://localhost:3000');

// let receiveMessage;
// 
export default function QuickPlay() {
    const [userId, setUserId] = useState();
    const [userList, setUserList] = useState();


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
        socket.emit('join', "My room");
    }, [])
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("data: ", data);
            setUserId(data);
        })
    },)


    return (
        <>
            <div>
                {/* <button onClick={sendMessage}>send message</button> Button to trigger sending a message */}
            </div>
            <div>
                <h3>Guest id:{userId} </h3>

            </div>

        </>

    );
}