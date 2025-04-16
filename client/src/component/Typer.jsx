import { useEffect, useState } from "react"

function Typer() {
    const [message,setMessage] =useState([]);

    useEffect(()=>{
        fetch('../../public/message.json').then((response)=>{
            response.json().then((data)=>{
                console.log("data: ",data);
                setMessage(data);
                // const msgArr=data.map((msg)=>{
                //     console.log("msg text: ",msg.text)

                // })
            })
        })
    },[])
    const max=message.length;
    const min=0;
    let randomIndex=Math.floor((Math.random() * (max - min) + min));
    console.log("random index: ", randomIndex);
    let currentMsg=message[randomIndex].text;
    console.log("random msg: ", currentMsg);


    return (
      <div className="message-box">
          <h3>{currentMsg}</h3> 

      </div>
    )
  }
  
  export default Typer
  