import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// this is called by Canvas
function NoteList({canvasID}) {
    // `canvasID` is the canvas_id, and it is a string of a number

    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);

    // function to retrieve last part of url to act as ID
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
                let tempNotes = []
                for (let i = 0; i < jsonInfo.length; i++) {
                    // check notes for those with matching `canvasID`
                    // by parsing `canvasID` as an integer
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
            })
            .then(setLoading(false))
    }, [])

    let list = notes.map(item => {
        let itemContent = item.content
        let tempID = item.slugNum
        return (
            <div className="note" key={tempID}>
                <li>
                    {itemContent}{" "}
                    <Link to={"/canvas/" + canvasID + "/editnote/" + tempID} >
                        <span className="edit-note-span">(edit)</span>
                    </Link>{" "}
                </li>
            </div>
        )
    })

    return (
        <div>
            {loading === false && 
                (
                    <Fragment>
                    <ul className="note-list">
                        {list}
                    </ul>
                    </Fragment>
                )
            }
        </div>
    )
}

export default NoteList;
