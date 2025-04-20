import Typer from "./Typer"
import React from 'react';
import { useEffect, useState } from "react"


function SoloPlay() {
    const [paragraphList, setParagraphList] = useState([]);
    const [randomParagraph, setRandomParagraph] = useState('');

    useEffect(() => {
        fetch('/message.json').then((response) => {
            response.json().then((data) => {
                // console.log("data: ",data);
                setParagraphList(data);
                const randomIndex = Math.floor(Math.random() * data.length);
                setRandomParagraph(data[randomIndex].text);
            }).catch(error => console.error('Error fetching data:', error));
        })
    }, [])

    if (!paragraphList || paragraphList.length === 0) {
        return <div>Loading messages...</div>;
    }

    return (

        < >
            <h1 className="is-size-1">Solo Play</h1>
            <Typer randomParagraph={randomParagraph} />

        </>

    )
}

export default SoloPlay
