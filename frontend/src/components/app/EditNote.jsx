import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditNote() {
    const { canvasID } = useParams()
    const { noteID } = useParams()

    const initialState = {canvas: canvasID, content: ''};
    const [formState, setFormState] = useState(initialState);

    const [oldContent, setOldContent] = useState();

    // `loading` is used as a guard operator to wait until `useEffect` is finished
    const [loading, setLoading] = useState(true);

    // function to retrieve original content
    useEffect(() => {
        fetch(`http://localhost:8000/notes/${noteID}`)
            .then(res => res.json())
            .then(jsonInfo => {
                console.log(jsonInfo)
                setOldContent(jsonInfo.content)
            })
            .then(setLoading(false))
    }, [])

    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.id]: event.target.value});
    };

    // updates the note using `axios.patch()`
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formState);
        axios.patch(`http://localhost:8000/notes/${noteID}`, formState)
        .then(res => {
            window.location.replace(`http://localhost:3000/canvas/${canvasID}`)
        })
        // clear the form
        setFormState(initialState);
    }

    // deletes the note using `axios.delete()`
    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete(`http://localhost:8000/notes/${noteID}`)
        .then(res => {
            window.location.replace(`http://localhost:3000/canvas/${canvasID}`)
        })
    }

    return (
        <div>
            {loading === false &&
                (
                    <Fragment>
                        {/* <h4>EditNote {noteID} from canvas {canvasID}</h4> */}
                        <h4>Edit note</h4>
                        <p>Original content: {oldContent}</p>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="content">New content: </label>
                            <input
                                id="content"
                                type="text"
                                onChange={handleChange}
                                value={formState.content}
                            />
                            <button type="submit">Submit</button>
                        </form>
                        <form onSubmit={handleDelete}>
                            <button type="submit">DELETE</button>
                        </form>
                    </Fragment>
                )
            }
        </div>
    );
}

export default EditNote;
