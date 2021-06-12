import React, { useState } from 'react';
import axios from 'axios';

function AddCanvas({userID}) {
    // console.log(userID)
    const initialState = {
        user: userID,
        canvas_name: ''
    };
    const [formState, setFormState] = useState(initialState);
    // console.log(formState);

    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.id]: event.target.value })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // do something with the data in the component state
        console.log(formState);
        axios.post('http://localhost:8000/canvases/', formState)
        .then(res => {
            window.location.replace('http://localhost:3000/dashboard')
        })
        // clear the form
        setFormState(initialState);
    };
    // Note that we need to use `htmlFor` instead of `for` in JSX
    return (
        <div>
            Add new canvas:
            <form onSubmit={handleSubmit}>
                <label htmlFor="canvas_name">Canvas name: </label>
                <input
                    id="canvas_name"
                    type="text"
                    onChange={handleChange}
                    value={formState.canvas_name}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddCanvas;