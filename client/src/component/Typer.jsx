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


    let index;

 

    function handleInput(event){ 
        if (!startTime) {
            setStartTime(Date.now());
            console.log("startTime: ",startTime);
        }

        if(event.code==='Space'){
            let userWord=userInput.trim();
            setUserInput("");
            event.preventDefault();
            console.log('userInput : ', userWord);
            if(userWord===wordsArr[wordsArrIndex]){
                console.log(userWord +": is equal to :"+ wordsArr[wordsArrIndex]);
                setcorrectWordArr([...correctWordArr,userWord]);
                setWordsArrIndex((wordsArrIndex)=>wordsArrIndex+1);

            }else{
                console.log(userWord +": is not  equal to :"+ wordsArr[wordsArrIndex]);
            }
            
        }

        // let userInput=event.target.value;
        // index=userInput.length-1;
        // console.log("user input ",userInput);

        // console.log("userInput", userInput[index]);
        // console.log("randomMsg",randomParagraph[index]);

        // if(userInput[index]!==randomParagraph[index]){
        //     console.log("error");
        //     setUserClassName("user-input-error")
        // }else{
        //     setUserClassName("user-input")
        // }    

    }


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
        console.log("correctWordArr updated: ", correctWordArr);
    }, [correctWordArr]);


    if (!paragraphList || paragraphList.length === 0) {
        return <div>Loading messages...</div>; 
    }

    

    return (
        <div className="typer-container">
            <div className="message-box">
                <h3 className="random-paragraph">{randomParagraph}</h3> 
            </div>
            <h4>wpm</h4>
            <h4>Accuracy</h4>
            <h4>timer</h4>
            <div>
                <h3>Correct Words:</h3>
                <p style={{ color: 'green', fontWeight: 'bold' }}>{correctWordArr.join(" ")}</p>
            </div>

            <div>
                <input  className={userClassName}  type="text" name="userText"   value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={handleInput}    />
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