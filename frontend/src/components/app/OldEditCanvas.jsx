import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditCanvas({userID}) {
    const [loading, setLoading] = useState(true);
    const { id } = useParams() 
    console.log(`canvas ID: ${id}`)

    const initialState = {
        user: 999,
        canvas_name: '',
        canvas_url: ''
    };
    
    const [formState, setFormState] = useState(initialState);

    const [user, setUser] = useState()
    const [originalCanvasName, setOriginalCanvasName] = useState()
    const [newCanvasName, setNewCanvasName] = useState()
    const [canvasURL, setCanvasURL] = useState()


    // function to get canvases from localhost:8000/canvases/
    useEffect(() => {
        fetch(`http://localhost:8000/canvases/${id}`)
            .then(res => res.json())
            .then(jsonInfo => {
                console.log(jsonInfo)
                setUser(jsonInfo.user)
                // console.log(typeof jsonInfo.user)
                setOriginalCanvasName(jsonInfo.canvas_name)
                setCanvasURL(jsonInfo.canvas_url)
                console.log(`user: ${jsonInfo.user}`)
                console.log(`canvas_name: ${jsonInfo.canvas_name}`)
                console.log(`canvas_url: ${jsonInfo.canvas_url}`)

            })
            .then(setLoading(false))
    }, []);
    
    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.id]: event.target.value })
        setFormState(
            {
                user: user,
                canvas_name: event.target.value,
                canvas_url: canvasURL
            }
        )
        // setNewCanvasName({...newCanvasName, [event.target.id]: event.target.value })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // do something with the data in the component state
        let newVersionCanvas = {
            user: user,
            canvas_name: newCanvasName,
            canvas_url: canvasURL
        }
        console.log(`newCanvasName: ${newCanvasName}`)
        console.log (`newVersionCanvas: ${JSON.stringify(newVersionCanvas)}`)
        // console.log(formState);
        axios.post('http://localhost:8000/canvases/', newVersionCanvas)
        .then(res => {
            window.location.replace('http://localhost:3000/dashboard')
        })
        // clear the form
        setFormState(initialState);
    };

    // Note that we need to use `htmlFor` instead of `for` in JSX
    return (
        <div>
            Edit canvas "{originalCanvasName}":
            <form onSubmit={handleSubmit}>
                <label htmlFor="canvas_name">New canvas name:</label>
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

export default EditCanvas;