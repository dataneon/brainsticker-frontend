import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditCanvas(props) {
    const { canvasID } = useParams()
    const { userID } = useParams()

    const initialState = {user: userID, canvas_name: ''};
    const [formState, setFormState] = useState(initialState)

    const [oldName, setOldName] = useState()

    // this is used as a guard operator for useEffect
    const [loading, setLoading] = useState()

    // function to retrieve original name of canvas
    useEffect(() => {
        fetch(`http://localhost:8000/canvases/${canvasID}`)
            .then(res => res.json())
            .then(jsonInfo => {
                console.log(jsonInfo)
                setOldName(jsonInfo.canvas_name)
            })
            .then(setLoading(false))
    }, [])

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
            {loading === false &&
                (
                    <Fragment>
                        Editing canvas "{oldName}"
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
                    </Fragment>
                )
            }
        </div>
    );
}

export default EditCanvas;
