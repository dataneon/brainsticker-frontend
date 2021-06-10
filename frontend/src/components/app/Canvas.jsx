import React, { Fragment, useEffect, useState } from 'react';

// this loads an individual canvas, linked to from CanvasList
// it will receive the canvas id/url via props
function Canvas({canvasID}) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // function to get notes from localhost:8000/notes/
    useEffect(() => {
        fetch('http://localhost:8000/notes/')
            .then(res => res.json())
            .then(jsonInfo => {
                // array for current canvas's notes
                let tmp_notes = []
                for (let i = 0; i < jsonInfo.length; i++ ) {
                    // check notes for those with current canvas number
                    if (jsonInfo[i].canvas === canvasID) {
                        tmp_notes.push(jsonInfo[i])
                    }
                }
                // set array of notes to notes state
                setNotes(tmp_notes)
            })
            .then(setLoading(false))
    }, []);

    return (
        <div>
            {loading === false && (
                <Fragment>
                    <p>You are on the canvas; the canvasID is: {canvasID}</p>
                    <p>Your notes are below:</p>
                    {notes.map(note => (
                        <h5 key={note.content}>{note.content}</h5>
                    ))}
                </Fragment>
            )}
        </div>
    );
}

export default Canvas;
