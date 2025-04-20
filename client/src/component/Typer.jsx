import { useEffect, useState } from "react"
import React from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';


function Typer({ randomParagraph, gameFinish, handleGameFinish }) {

    const [userClassName, setUserClassName] = useState("user-input");
    const [wordsArr, setWordsArr] = useState([]);
    const [wordsArrIndex, setWordsArrIndex] = useState(0);
    const [correctWordArr, setcorrectWordArr] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [characterErrorCount, setCharacterErrorCount] = useState(0);
    const [progress, setProgress] = useState(0);


    Typer.propTypes = {
        randomParagraph: PropTypes.string.isRequired,
        gameFinish: PropTypes.bool.isRequired,
        handleGameFinish: PropTypes.func.isRequired,

    };

    const initialTime = 3 * 60;
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

        if (!startTime) {
            const now = Date.now();
            setStartTime(now);
            console.log("startTime: ", now);
        }
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

        const timerInterval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (gameFinish) {
                    clearInterval(timerInterval);
                    console.log('game completed!');
                    return timeRemaining;
                } else if (prevTime === 0) {
                    clearInterval(timerInterval);
                    // Perform actions when the timer reaches zero
                    console.log('Countdown complete!');
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(timerInterval);
    }, [gameFinish]); // The empty 




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
        // console.log("currwpm: ", currwpm+ " wpm");
        setWpm(currwpm);
    }, [timeRemaining]);

    //calculate accuracy
    useEffect(() => {
        console.log("error count: ", characterErrorCount);
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
            setProgress(() => newProgress);
        }
    }, [correctWordArr]);




    return (
        <div className="hero-body" >
            <div>
                <h3>You </h3>
                <progress value={progress} max={100} />
            </div>

            <div className="message  has-text-centered">
                <div className="message-header has-background-link has-text-light">
                    <p>Snippet</p>
                </div>
                <div className="message-body ">
                    <h3 className="random-paragraph">{randomParagraph}</h3>
                </div>

            </div>
            <div className="columns is-multiline is-mobile">
                <div className="column is-one-quarter  ">
                    <h4>wpm</h4>
                    <h4>{wpm} </h4>
                </div>
                <div className="column is-one-quarter">
                    <h4>Accuracy </h4>
                    <h4>{accuracy}%</h4>
                </div>
                <div className="column is-one-quarter">
                    <h4>Time Remaining </h4>
                    <h4>{timeRemaining}</h4>
                </div>
            </div>

            <div>
                <h3>Correct Words:</h3>
                <p className="has-text-success">{correctWordArr.join(" ")}</p>
            </div>
            <div>
                <input className={`${userClassName} input`} disabled={gameFinish || timeRemaining === 0} type="text" name="userText" value={userInput} onChange={handleInput} onPaste={(e) => {
                    e.preventDefault()
                    return false;
                }} />
            </div>
            <div>
                {
                    gameFinish &&
                    <div>
                        <h2>You Finished the race yayy... </h2>
                        <button className="button is-yellow has-background-link has-text-light" onClick={buttonHandler}>Play Again</button>
                    </div>
                }
            </div>

        </div>
    )
}

export default Typer
