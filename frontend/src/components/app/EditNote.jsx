import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditNote() {
    // pulling info from URL
    const { canvasID } = useParams()
    const { noteID } = useParams()

    const initialState = {canvas: canvasID, content: ''};
    const [formState, setFormState] = useState(initialState);

    // oldContent used so that we can display what will be replaced
    const [oldContent, setOldContent] = useState();

    // `loading` is used as a guard operator to wait until `useEffect` is finished
    const [loading, setLoading] = useState(true);

    // function to retrieve original content
    useEffect(() => {
        fetch(`http://localhost:8000/notes/${noteID}`)
            .then(res => res.json())
            .then(jsonInfo => {
                // console.log(jsonInfo)
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
        axios.patch(`https://brainsticker.herokuapp.com/notes/${noteID}`, formState)
        .then(res => {
            window.location.replace(`http://localhost:3000/canvas/${canvasID}`)
        })
        // clear the form
        setFormState(initialState);
    }

    // deletes the note using `axios.delete()`
    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete(`https://brainsticker.herokuapp.com/notes/${noteID}`)
        .then(res => {
            window.location.replace(`http://localhost:3000/canvas/${canvasID}`)
        })
    }

    return (
        <div>
            {loading === false &&
                (
                    <Fragment>
                        <h3 className="mid-level-header">Edit Note</h3>
                        <p id="original-note-content">Original content: {oldContent}</p>
                        <form onSubmit={handleSubmit} id="edit-note-form">
                            <label htmlFor="content">New content: </label>
                            <input
                                id="content"
                                type="text"
                                onChange={handleChange}
                                value={formState.content}
                            />
                            <button type="submit" class="form-button">Submit</button>
                        </form>
                        <form onSubmit={handleDelete}>
                            <button type="submit" class="delete-button">DELETE</button>
                        </form>
                    </Fragment>
                )
            }
        </div>
    );
}

export default EditNote;
