import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditCanvas(props) {
    const { canvasID } = useParams()
    const { userID } = useParams()

    const initialState = {user: userID, canvas_name: ''};
    const [formState, setFormState] = useState(initialState)

    const [oldName, setOldName] = useState()

    // `loading` is used as a guard operator for `useEffect`
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

    // update the canvas name using `axios.patch()`
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formState);
        axios.patch(`http://localhost:8000/canvases/${canvasID}`, formState)
        .then(res => {
            window.location.replace(`http://localhost:3000/dashboard/`)
        })
        setFormState(initialState);
    }

    // delete the canvas using `axios.delete()`
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
                        <h3 className="mid-level-header">Edit Canvas "{oldName}"</h3>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="canvas_name">New canvas name: </label>
                            <input
                                id="canvas_name"
                                type="text"
                                onChange={handleChange}
                                value={formState.canvas_name}
                            />
                            <button type="submit" className="form-button">Submit</button>
                        </form>
                        <form onSubmit={handleDelete}>
                            <button type="submit" className="delete-button">DELETE</button>
                        </form>
                    </Fragment>
                )
            }
        </div>
    );
}

export default EditCanvas;
