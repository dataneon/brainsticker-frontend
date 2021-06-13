import React, { useState } from 'react';
import axios from 'axios';

function AddNote({canvasID}) {
    const initialState = {canvas: canvasID, content: ''};
    const [formState, setFormState] = useState(initialState);

    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.id]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formState);
        axios.post("https://brainsticker.herokuapp.com/notes/", formState)
        .then(res => {
            window.location.replace(`http://brainsticker-frontend.surge.sh/canvas/${canvasID}`)
        })
        // clear the form
        setFormState(initialState);
    }

    return (
        <div id="new-note-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="content">Add a new note: </label>
                <input
                    id="content"
                    type="text"
                    onChange={handleChange}
                    value={formState.content}
                />
                <button type="submit" className="form-button">Add</button>
            </form>
        </div>
    );
}

export default AddNote;
