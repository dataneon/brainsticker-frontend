import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataContext';

// this will be called by Dashboard to pull up a user's canvases
function CanvasList({userID}) {
    const [canvases, setCanvases] = useState([]);

    // loading is used as a guard operator that waits for useEffect
    const [loading, setLoading] = useState(true);

    // function gets the last digits of the url, acting as unique number for canvas
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
        fetch('https://brainsticker.herokuapp.com/canvases/')
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
        // note that `item.slugNum` is a number here
        let tmp_id = item.slugNum

        return (
            <ul className="canvas" key={tmp_id}>
                <li>
                    <Link to={"/canvas/" + tmp_id} >
                        <span className="canvas-li-name">{tmp_name}</span>
                    </Link>{" "}
                    <Link to={"/canvas/" + tmp_id + "/editcanvas/" + userID} >
                    <span className="edit-span">(edit)</span>
                    </Link>{" "}
                </li>
            </ul>
        )
    })
    
    return (
        <div className="canvas-list">
            {loading === false &&
                (
                    <Fragment>
                        <DataContext.Provider value={userID}>
                        <h3>Your canvases</h3>
                        {list}
                        </DataContext.Provider>
                    </Fragment>
                )
            }
        </div>
    );
}

export default CanvasList;
