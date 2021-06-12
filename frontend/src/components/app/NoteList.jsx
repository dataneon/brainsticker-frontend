import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// this is called by Canvas
function NoteList({canvasID}) {
    // `canvasID` is the canvas_id, and it is a string of a number
    // console.log(typeof canvasID, canvasID)
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);

    function getNoteURLID(urlString) {
        let n = urlString.search('/notes/');
        let idStartpoint = n + 7;
        let idStr = urlString.slice(idStartpoint);
        let idNum = parseInt(idStr)
        return idNum;
    }

    useEffect(() => {
        fetch('http://localhost:8000/notes/')
            .then(res => res.json())
            .then(jsonInfo => {
                // console.log(jsonInfo)
                // console.log(typeof jsonInfo[0].canvas, jsonInfo[0].canvas)
                let tempNotes = []
                for (let i = 0; i < jsonInfo.length; i++) {
                    // check notes for those with matching `canvasID`
                    // by parsing `canvasID` as an integer
                    // console.log(parseInt(canvasID))
                    if (jsonInfo[i].canvas === parseInt(canvasID)) {
                        let tempObj = jsonInfo[i]
                        let slugNum = getNoteURLID(tempObj.note_url)
                        // add slugNum as a key-value pair
                        tempObj['slugNum'] = slugNum
                        tempNotes.push(tempObj)
                    }
                }
                // set array of notes to ntes state
                setNotes(tempNotes)
                // console.log(tempNotes)
            })
            .then(setLoading(false))
    }, [])

    let list = notes.map(item => {
        let itemContent = item.content
        let tempID = item.slugNum
        return (
            <div className="notes" key={tempID}>
                <p>
                    {/* <Link to={"/canvas/" + canvasID + "/note/" + tempID} > */}
                        {itemContent}{" "}
                    {/* </Link>{" "} */}
                    <Link to={"/canvas/" + canvasID + "/editnote/" + tempID} >
                        (edit)
                    </Link>{" "}
                </p>
            </div>
        )
    })

    return (
        <div>
            {loading === false && 
                (
                    <Fragment>
                    <h3>List of notes</h3>
                    {list}
                    </Fragment>
                )
            }
        </div>
    )
}

export default NoteList;
