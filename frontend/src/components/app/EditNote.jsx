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
        </div>
    );
}

export default EditNote;
