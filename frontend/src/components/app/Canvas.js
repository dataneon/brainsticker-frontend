import React, { useEffect, useState } from 'react';

// this will be called by Dashboard to pull up a user's canvases
function Canvas({userID}) {
    const [canvases, setCanvases] = useState([]);
    const [loading, setLoading] = useState(true);

    // function to get canvases from localhost:8000/canvases/
    useEffect(() => {
        fetch('http://localhost:8000/canvases/')
            .then(res => res.json())
            // .then(jsonInfo => setCanvases([...jsonInfo]))
            .then(jsonInfo => {
                // array for current user's canvases
                let tmp_canvases = []
                for (let i = 0; i < jsonInfo.length; i++) {
                    // check canvases for those made by current user
                    if (jsonInfo[i].user == userID) {
                        tmp_canvases.push(jsonInfo[i])
                    }
                }
                // set canvases to array of canvases
                setCanvases(tmp_canvases)
            })
            .then(setLoading(false))
    }, []);

    return (
        <div>
            <p>You are on the canvas, and your ID is: {userID}</p>
            <p>Your canvases are below:</p>
            {canvases.map(canvas => (
                <p key={canvas.canvas_name}>{canvas.canvas_name}</p>
            ))}
        </div>
    );
}

export default Canvas;
