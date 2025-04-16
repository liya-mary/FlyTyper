import { useEffect, useState } from "react"

function Typer() {
    const [message,setMessage] =useState([]);

    function handleInput(event){
        console.log("user input ",event.target.value );
    }

    useEffect(()=>{
        fetch('../../public/message.json').then((response)=>{
            response.json().then((data)=>{
                // console.log("data: ",data);
                setMessage(data);
            }).catch(error => console.error('Error fetching data:', error));
        })
    },[])

    if (!message || message.length === 0) {
        return <div>Loading messages...</div>; 
    }
  

    const max=message.length;
    const min=0;
    let randomIndex=Math.floor((Math.random() * (max - min) + min));
    console.log("random index: ", randomIndex);
    let currentMsg=message[randomIndex].text;
    console.log(" random obj: ", currentMsg);



    return (
        <div className="typer-container">
            <div className="message-box">
                <h3>{currentMsg}</h3> 

            </div>

            <input type="text" name="userText" onChange={handleInput} />
        </div>

    )
  }
  
  export default Typer
// const msgArr=data.map((msg)=>{
//     console.log("msg text: ",msg.text)
// })