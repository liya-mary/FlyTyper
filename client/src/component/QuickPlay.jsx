import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Typer from './Typer';

const socket = io.connect('http://localhost:3000');

export default function QuickPlay() {
    const [gameFinish, setGameFinish] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [roomData, setRoomData] = useState({});
    const [users, setUsers] = useState({});


    const handleGameFinish = () => {
        setGameFinish(true);

    }
    const handleProgress = (progress) => {
        socket.emit("trackProgress", progress);
    }

    const handleWpm = (currWpm) => {
        socket.emit("trackWpm", currWpm);
    }

    useEffect(() => {
        if (socket) {
            socket.emit('join');
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
            <section className="hero ">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns"></div>
                        < div className="column is-8 is-offset-2   mt-4 ">

                            <h1 className="is-size-2 has-text-weight-semibold is-family-secondary">Quick Play</h1>


                            {
                                Object.keys(users).length > 0 ? (
                                    Object.keys(users).map((userid) => {
                                        return <div key={userid}>
                                            {userid === socket.id ? (
                                                <div className='columns is-mobile is-vcentered  is-10 is-offset-2 mt-4 '>
                                                    <h4 className='column is-one-quarter has-text-weight-semibold   '>you : {roomData.users[userid].userWpm} wpm</h4>

                                                    <div className="column is-6">
                                                        <progress value={roomData.users[userid].userProgress} max={100} className="progress is-6 is-success is-normal   has-background-white  is-two-quater " />
                                                    </div>

                                                    {/* Ai */}
                                                    {roomData.users[userid]?.rank != null && (
                                                        <h5 className='column is-one-quarter has-text-weight-semibold '>Rank: {roomData.users[userid].rank}</h5>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className='columns is-mobile is-vcentered  is-10 is-offset-2 mt-4  '>
                                                    <h4 className='column is-one-quarter has-text-weight-semibold   '>Guest : {roomData.users[userid].userWpm} wpm</h4>
                                                    <div className="column is-6">
                                                        <progress value={roomData.users[userid].userProgress} max={100} className="progress  is-6 is-success is-normal  has-background-white " />
                                                    </div>

                                                    {roomData.users[userid]?.rank != null && (
                                                        <h5 className='column is-one-quarter has-text-weight-semibold '>Rank: {roomData.users[userid].rank}</h5>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    })
                                ) : (
                                    <p></p>
                                )
                            }

                            <div>
                                <Typer randomParagraph={roomData.roomParagraph}
                                    gameFinish={gameFinish} handleGameFinish={handleGameFinish} wpm={roomData.users?.[socket.id]?.userWpm} handleWpm={handleWpm} progress={0} handleProgress={handleProgress} startTime={roomData.startTime} gameStarted={gameStarted} />
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}