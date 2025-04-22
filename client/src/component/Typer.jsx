import { useEffect, useState, useRef } from "react"
import React from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';


function Typer({ randomParagraph, gameFinish, handleGameFinish, wpm, handleWpm, progress, handleProgress, startTime, gameStarted }) {

    const [userClassName, setUserClassName] = useState("user-input");
    const [wordsArr, setWordsArr] = useState([]);
    const [wordsArrIndex, setWordsArrIndex] = useState(0);
    const [correctWordArr, setcorrectWordArr] = useState([]);
    // const [startTime, setStartTime] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [accuracy, setAccuracy] = useState(100);
    const [characterErrorCount, setCharacterErrorCount] = useState(0);
    const [now, setNow] = useState(Date.now());


    Typer.propTypes = { //AI code
        randomParagraph: PropTypes.string.isRequired,
        gameFinish: PropTypes.bool.isRequired,
        handleGameFinish: PropTypes.func.isRequired,
        wpm: PropTypes.number.isRequired,
        handleWpm: PropTypes.func.isRequired,
        progress: PropTypes.number.isRequired,
        handleProgress: PropTypes.func.isRequired,
        startTime: PropTypes.number.isRequired,
        gameStarted: PropTypes.bool.isRequired,


    };

    const initialTime = 3 * 60;
    const inputReference = useRef(null);
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    // let navigate = useNavigate();

    const buttonHandler = () => {
        console.log("button clicked");
        window.location.reload(true);
        // navigate('/soloplay');

    }

    function handleCharacterError(value) {
        let currWord = wordsArr[wordsArrIndex];
        for (let i = 0; i < value.length; i++) {
            if (value[i] !== currWord[i]) {
                setCharacterErrorCount((characterErrorCount) => characterErrorCount + 1);
                console.log("char error.....");
                setUserClassName("has-background-danger");
                return;
            }
        }
        setUserClassName("has-background-white");
    }

    function handleInput(event) {

        // if (!startTime) {
        //     const now = Date.now();
        //     setStartTime(now);
        //     console.log("startTime: ", now);
        // }
        let value = event.target.value;
        console.log("typeof :", typeof (value))
        console.log("value: ", value);

        setUserInput(value);


        if (value.includes(" ")) {
            let userWord = userInput.trim();
            console.log('userInput : ', userWord);
            if (userWord === wordsArr[wordsArrIndex]) {
                console.log(userWord + ": is equal to :" + wordsArr[wordsArrIndex]);
                setcorrectWordArr([...correctWordArr, userWord]);
                setWordsArrIndex((wordsArrIndex) => wordsArrIndex + 1);
                value = '';
                setUserInput(value);
            } else {
                console.log(userWord + ": is not  equal to :" + wordsArr[wordsArrIndex]);
            }

        }

        handleCharacterError(value);

        if (wordsArrIndex === wordsArr.length - 1) {
            console.log("userInput : ", value);
            console.log("wordsArr[wordsArrIndex] : ", wordsArr[wordsArrIndex]);
            if (value === wordsArr[wordsArrIndex]) {
                console.log(value + ": is equal to :" + wordsArr[wordsArrIndex]);
                console.log("you win");
                setcorrectWordArr([...correctWordArr, value]);
                setUserInput("");
                handleGameFinish();
                // alert("you won");
            } else {
                console.log(value + ": is not equal to :" + wordsArr[wordsArrIndex]);
            }
        }
    }

    useEffect(() => {
        if (gameStarted) {
            const timerInterval = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (gameFinish) {
                        clearInterval(timerInterval);
                        // const timeTaken=Date.now()-
                        console.log('game completed!');
                        return timeRemaining;
                    } else if (prevTime === 0) {
                        clearInterval(timerInterval);
                        console.log('Countdown complete!');
                        return 0;
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);

            return () => clearInterval(timerInterval);
        }

    }, [gameFinish, gameStarted]);

    useEffect(() => { //AI
        if (!gameStarted) {
            const interval = setInterval(() => {
                setNow(Date.now());
            }, 1000);
            return () => clearInterval(interval);
        } else {
            inputReference.current?.focus();
        }
    }, [gameStarted]);



    useEffect(() => {
        if (randomParagraph) {
            let words = randomParagraph.split(" ");
            setWordsArr(words);
            console.log("wordsarr: ", wordsArr);
        }
    }, [randomParagraph]);

    //calculate wpm
    useEffect(() => {
        let wordcount = correctWordArr.length;
        // console.log("wordcount: ",wordcount);
        let timeTaken = ((Date.now() - startTime) / 1000) / 60;
        // console.log("time taken: ", timeTaken);
        let currwpm = Math.round((wordcount / timeTaken));
        console.log("currwpm: ", currwpm + " wpm");
        // setWpm(currwpm);
        handleWpm(currwpm);
    }, [timeRemaining]);

    //calculate accuracy
    useEffect(() => {
        // console.log("error count: ", characterErrorCount);
        if (correctWordArr.length > 0) {
            const totalWordCount = wordsArr.length;
            const wrongWordsCount = characterErrorCount / 5;
            // console.log("wrong wordcount: ", wrongWordsCount);
            const wordAccuracy = Math.round(((totalWordCount - wrongWordsCount) / totalWordCount) * 100);
            // console.log("accuracy here : ", wordAccuracy);
            setAccuracy(wordAccuracy);
        }

    }, [timeRemaining]);

    //progress
    useEffect(() => {
        if (correctWordArr.length > 0) {
            let newProgress = Math.round((correctWordArr.length / wordsArr.length) * 100);
            console.log("newprogress: ", newProgress);
            // setProgress(() => newProgress);
            handleProgress(newProgress);
        }
    }, [correctWordArr]);


    return (
        <div className="hero-body" >
            {/* <div>
                <h3>You </h3>
                <progress value={progress} max={100} />
            </div> */}
            <div className="columns column is-8  has-text-centered  ">
                {!gameStarted && startTime && (
                    <h2 className="has-text-weight-semibold is-size-4 has-text-success " >Game starts in :{Math.max(0, Math.floor((startTime - now) / 1000))}s</h2>
                )}
            </div>

            <div>
                {
                    gameFinish &&
                    <div>
                        <h2 className="has-text-weight-semibold is-size-4 has-text-success">You Finished the race yayy... </h2>
                        <button className="button is-yellow has-background-link has-text-light is-medium mb-4 " onClick={buttonHandler}>Play Again</button>
                    </div>
                }
            </div>

            <div className="message  is-size-4 ">
                <div className="message-header has-background-link has-text-light">
                    <p>Snippet</p>
                </div>
                <div className="message-body has-background-white ">
                    <h3 className="is-size-5" ><strong>{randomParagraph}</strong></h3>
                </div>

            </div>


            <div>
                <h3>Correct Words:</h3>
                <p className="has-text-success">{correctWordArr.join(" ")}</p>
            </div>
            <div className="mt-4">
                <input className={`${userClassName} input`} disabled={gameFinish || timeRemaining === 0 || !gameStarted} type="text" name="userText" value={userInput} onChange={handleInput} onPaste={(e) => {
                    e.preventDefault()
                    return false;
                }} ref={inputReference} />
            </div>

            <div className="columns  is-mobile mt-4 message ">
                <div className="column is-two-quarters has-text-centered ">
                    <h4 className="message-header has-background-link has-text-white is-centered has-text-weight-semibold ">wpm</h4>
                    <h4 className="message-body has-background-white  ">{wpm} </h4>
                </div>
                <div className="column is-two-quarters has-text-centered  ">
                    <h4 className="message-header has-background-link has-text-white  has-text-centered  ">Accuracy </h4>
                    <h4 className="message-body has-background-white ">{accuracy}%</h4>
                </div>
                <div className="column ">
                    <h4 className=" message-header has-background-link has-text-white has-text-centered ">Timer</h4>
                    <h4 className="message-body has-background-white ">{new Date(timeRemaining * 1000).toISOString().substring(14, 19)}</h4>
                </div>
            </div>



        </div>
    )
}

export default Typer
