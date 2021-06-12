import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditNote() {
    const { canvasID } = useParams()
    const { noteID } = useParams()

    const initialState = {canvas: canvasID, content: ''};
    const [formState, setFormState] = useState(initialState);

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
            EditNote {noteID} from canvas {canvasID}
            <form onSubmit={handleSubmit}>
                <label htmlFor="content">Content:</label>
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
        </div>
    );
}

export default EditNote;
