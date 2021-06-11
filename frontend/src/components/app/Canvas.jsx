import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import MyEditor from './MyEditor';

// this loads an individual canvas, linked to from CanvasList
// it will receive the canvas id by using the url via `useParams()`
function Canvas() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Because we designated the path to the canvas as `/canvas/:id` in `app.js`
    // we need to write the props as such
    const { id } = useParams() 
    // this id comes from the url, specifically what comes after `/canvas/` 
    // `id`, when grabbed using `useParams()` is a string.
    // `id` will be used for the sake of identifying particular canvases
    // console.log(typeof id, id)


    // function to get notes from localhost:8000/notes/
    useEffect(() => {
        fetch('http://localhost:8000/notes/')
            .then(res => res.json())
            .then(jsonInfo => {
                // console.log(jsonInfo)
                // array for current canvas's notes
                let tmp_notes = []
                for (let i = 0; i < jsonInfo.length; i++) {
                    // `jsonInfo[i].canvas` is a number, while `id` is a string
                    // so we convert `id` to a number for the comparison
                    let idNum = parseInt(id)
                    // check notes for those with current canvas number
                    if (jsonInfo[i].canvas === idNum) {
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
                    <p>You are on the canvas; the id is: {id}</p>
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
