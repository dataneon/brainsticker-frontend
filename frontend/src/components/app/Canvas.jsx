import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddNote from './AddNote';
import NoteList from './NoteList';

// this loads an individual canvas, linked to from CanvasList
// it will receive the canvas id by using the url via `useParams()`
function Canvas() {
    // Because we designated the path to the canvas as `/canvas/:canvasID` in `app.js`
    // we need to write the props as such
    const { canvasID } = useParams() 
    // this id comes from the url, specifically what comes after `/canvas/` 
    // `canvasID`, when grabbed using `useParams()` is a string

    const [canvasName, setCanvasName] = useState()
    
    // `loading` is used as a guard operator to wait until `useEffect` is finished
    const [loading, setLoading] = useState()

    // function to retrieve canvas name
    useEffect(() => {
        fetch(`http://localhost:8000/canvases/${canvasID}`)
            .then(res => res.json())
            .then(jsonInfo => {
                console.log(jsonInfo)
                setCanvasName(jsonInfo.canvas_name)
            })
            .then(setLoading(false))
    }, [])


    return (
        <div>
            {loading === false &&
                (
                    <Fragment>
                        <p>You are on the canvas "{canvasName}"</p>
                        <AddNote canvasID={canvasID} />
                        {/* <p>List of notes for canvas:</p> */}
                        <NoteList canvasID={canvasID} />
                    </Fragment>
                )
            }
        </div>
    );
}

export default Canvas;
