import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { DataContext } from '../DataContext';

// this will be called by Dashboard to pull up a user's canvases
function CanvasList({userID}) {
    const [canvases, setCanvases] = useState([]);
    const [loading, setLoading] = useState(true);

    // function gets the last digits of the url
    // which is also a unique number for the canvas
    function getCanvasURLID (urlString) {
        let n = urlString.search('/canvases/')
        let idStartPoint = n + 10
        let idStr = urlString.slice(idStartPoint)
        let idNum = parseInt(idStr)
        // returns the id as an integer
        return idNum;
    }

    // function to get canvases from localhost:8000/canvases/
    useEffect(() => {
        fetch('http://localhost:8000/canvases/')
            .then(res => res.json())
            .then(jsonInfo => {
                // array for current user's canvases
                let tmp_canvases = []
                for (let i = 0; i < jsonInfo.length; i++) {
                    // check canvases for those made by current user
                    if (jsonInfo[i].user === userID) {
                        let tmp_object = jsonInfo[i]
                        let slugNum = getCanvasURLID(tmp_object.canvas_url)
                        // add slugNum as key-value pair
                        tmp_object['slugNum'] = slugNum
                        tmp_canvases.push(tmp_object)
                    }
                }
                // set array of canvases to canvases state
                setCanvases(tmp_canvases)
            })
            .then(setLoading(false))
    }, []);

    let list = canvases.map(item => {
        let tmp_name = item.canvas_name
        // note that `item.slugNum` is a Number here
        let tmp_id = item.slugNum

        return (
            <div className="canvas" key={tmp_id}>
                <p>
                    <Link to={"/canvas/" + tmp_id} >
                        {tmp_name}
                    </Link>{" "}
                    <Link to={"/canvas/" + tmp_id + "/editcanvas/"} >
                        (edit)
                    </Link>{" "}
                </p>
            </div>
        )
    })
    
    return (
        <div>
            {/* <DataContext.Provider value={userID}> */}
            {/* </DataContext.Provider> */}
            <h3>List of canvases</h3>
            {list}
        </div>
    );
}

export default CanvasList;
