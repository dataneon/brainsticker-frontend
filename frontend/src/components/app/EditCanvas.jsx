import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditCanvas(props) {
    console.log(props)
    const { canvasID } = useParams()
    const { userID } = useParams()

    const initialState = {user: userID, canvas_name: ''};
    const [formState, setFormState] = useState(initialState)

    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.id]: event.target.value});
    };

    // updates the canvas name using `axios.patch()`
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formState);
        axios.patch(`http://localhost:8000/canvases/${canvasID}`, formState)
        .then(res => {
            window.location.replace(`http://localhost:3000/dashboard/`)
        })
        setFormState(initialState);
    }

    // deletes the canvas using `axios.delete()`
    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete(`http://localhost:8000/canvases/${canvasID}`)
        .then(res => {
            window.location.replace(`http://localhost:3000/dashboard/`)
        })
    }

    return (
        <div>
            This is EditCanvas, editing canvas {canvasID} {" "}
            from user {userID}
            <br />
            <form onSubmit={handleSubmit}>
                <label htmlFor="canvas_name">Canvas name:</label>
                <input
                    id="canvas_name"
                    type="text"
                    onChange={handleChange}
                    value={formState.canvas_name}
                />
                <button type="submit">Submit</button>
            </form>
            <form onSubmit={handleDelete}>
                <button type="submit">DELETE</button>
            </form>
        </div>
    );
}

export default EditCanvas;
