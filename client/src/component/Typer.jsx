import { useEffect, useState } from "react"

function Typer() {
    const [paragraphList,setParagraphList] =useState([]);
    const [randomParagraph,setRandomParagraph] =useState('');
    const [userClassName, setUserClassName] =useState("user-input");
    // const [characterClassName, setcharacterClassName] =useState("");
    const [wordsArr,setWordsArr] =useState([]);
    const [wordsArrIndex,setWordsArrIndex] =useState(0);
    const [correctWordArr,setcorrectWordArr] =useState([]);
    const [startTime, setStartTime] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [wpm,setWpm]=useState(0);
    const [gameFinish, setGameFinish]=useState(false);
    const [accuracy,setAccuracy]=useState(100);
    const [characterErrorCount,setCharacterErrorCount]=useState(0);
    


    const initialTime = 3*60;
    const [timeRemaining, setTimeRemaining] = useState(initialTime);


    function handleCharacterError(value){
        let currWord= wordsArr[wordsArrIndex];
        for(let i=0;i<value.length;i++){
            if(value[i] !== currWord[i]){
                setCharacterErrorCount((characterErrorCount)=>characterErrorCount+1);
                console.log("char error.....");
                setUserClassName("user-input-error");
                return;
            }  
        }
        setUserClassName("user-input");
    }

    function handleInput(event){

        if (!startTime) {
            const now = Date.now();
            setStartTime(now);
            console.log("startTime: ", now);
        }
        let value=event.target.value;
        console.log("typeof :",typeof(value))
        console.log("value: ",value);

        setUserInput(value);


        if(value.includes(" ")){
            let userWord=userInput.trim();
            console.log('userInput : ', userWord);
            if(userWord===wordsArr[wordsArrIndex]){
                console.log(userWord +": is equal to :"+ wordsArr[wordsArrIndex]);
                setcorrectWordArr([...correctWordArr,userWord]);
                setWordsArrIndex((wordsArrIndex)=>wordsArrIndex+1);
                value='';
                setUserInput(value);
            }else{
                console.log(userWord +": is not  equal to :"+ wordsArr[wordsArrIndex]);
            }

        }

        handleCharacterError(value);

        if(wordsArrIndex===wordsArr.length-1){
            console.log("userInput : ", value);
            console.log("wordsArr[wordsArrIndex] : ", wordsArr[wordsArrIndex]);
            if(value===wordsArr[wordsArrIndex]){
                console.log(value +": is equal to :"+ wordsArr[wordsArrIndex]);
                console.log("you win");
                setcorrectWordArr([...correctWordArr,value]);
                setUserInput("");
                setGameFinish(true);
                // alert("you won");
            }else{
                console.log(value +": is not equal to :"+ wordsArr[wordsArrIndex]);
            }
        }
    }

    useEffect(() => {

        const timerInterval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if(gameFinish){
                    clearInterval(timerInterval);
                    console.log('game completed!');
                    return timeRemaining;
                }else if (prevTime === 0) {
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


    useEffect(()=>{
        fetch('/message.json').then((response)=>{
            response.json().then((data)=>{
                // console.log("data: ",data);
                setParagraphList(data);
                const randomIndex = Math.floor(Math.random() * data.length);
                setRandomParagraph(data[randomIndex].text);
            }).catch(error => console.error('Error fetching data:', error));
        })
    },[])

    useEffect(() => {
        if(randomParagraph){
            let words=randomParagraph.split(" ");
            setWordsArr(words);
            console.log("wordsarr: ",wordsArr);
        }
    }, [randomParagraph]);


    useEffect(() => {
        let wordcount=correctWordArr.length;
        // console.log("wordcount: ",wordcount);
        let timeTaken=((Date.now()-startTime)/1000)/60;
        // console.log("time taken: ", timeTaken);
        let currwpm=  Math.round((wordcount / timeTaken));
        // console.log("currwpm: ", currwpm+ " wpm");
        setWpm(currwpm);
    }, [timeRemaining]);

    useEffect(() => {
        console.log("error count: ",characterErrorCount);
        if(correctWordArr.length>0){
            const totalWordCount=wordsArr.length;
            const wrongWordsCount=characterErrorCount/5;
            console.log("wrong wordcount: ",wrongWordsCount);
            const wordAccuracy=Math.round(((totalWordCount-wrongWordsCount)/totalWordCount)*100);
            console.log("accuracy here : ",wordAccuracy);
            setAccuracy(wordAccuracy);
        }

    }, [timeRemaining]);

    



    if (!paragraphList || paragraphList.length === 0) {
        return <div>Loading messages...</div>; 
    }

    

    return (
        <div className="typer-container">
            <div className="message-box">
                <h3 className="random-paragraph">{randomParagraph}</h3> 
            </div>
            <h4>wpm:  {wpm}</h4>
            <h4>Accuracy : {accuracy}%</h4>
            <h4>timer :{timeRemaining}</h4>
            <div>
                <h3>Correct Words:</h3>
                <p style={{ color: 'green', fontWeight: 'bold' }}>{correctWordArr.join(" ")}</p>
            </div>
            <div>
                <input  className={userClassName}  type="text" name="userText"   value={userInput} onChange={handleInput} />

            </div>
            <div>
                {
                    gameFinish && <h2>You Finished the race yayy... </h2>
                }
            </div>

        </div>
    )
  }
  
  export default Typer
// const msgArr=data.map((msg)=>{
//     console.log("msg text: ",msg.text)
// })

    // let charactr='';
    // let start='';
    // let end='';

        // charactr=randomParagraph[index],
        // start=randomParagraph.slice(0,index)
        // end=randomParagraph.slice(index)
        // console.log(`charactr${charactr}   ,start ${start} ,end ${end}   `)


            // setcharacterClassName("error-char")

            // setcharacterClassName("correct-char")

                {/* <h4 className={characterClassName}>{start}</h4> */}
                {/* <h4>{start} <span className={characterClassName}>{charactr}</span>{end}</h4> */}
                
                // onKeyDown={(event) => {
                //     if (event.key === ' ') {
                //     console.log("Space key pressed");
                //     }
                // }}


    // function handleKeyDown(event){ 
    //     if (!startTime) {
    //         const now = Date.now();
    //         setStartTime(now);
    //         console.log("startTime: ", now);
    //     }

    //     let userWord=userInput.trim();
    //     // let currentChar=value;

    //     if(event.code==='Space'){
    //         event.preventDefault();
    //         console.log('userInput : ', userWord);
    //         if(userWord===wordsArr[wordsArrIndex]){
    //             console.log(userWord +": is equal to :"+ wordsArr[wordsArrIndex]);
    //             setcorrectWordArr([...correctWordArr,userWord]);
    //             setWordsArrIndex((wordsArrIndex)=>wordsArrIndex+1);
    //             setUserInput("");
    //             // calculateWordsPerMin();

    //         }else{
    //             console.log(userWord +": is not  equal to :"+ wordsArr[wordsArrIndex]);
    //         }
            
    //     }