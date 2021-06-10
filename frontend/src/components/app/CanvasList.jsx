import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Canvas from './Canvas'


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

    // console.log(canvases[0])

    // TODO: pass props to canvas
    // Does CanvasList handle the route here?

    // My idea is that the link would have a specific url using the slug;
    // then we could pass some form of ID to the Canvas component and load
    // the Canvas component. This is why I think Route might be necessary. 
    // However, they could also simply all route to the  same {component},
    // so that the URL would simply be component. This does violate the ethos of
    // having the URL that the user seeing not match up completely with the a
    // path into directories.

    // This other way might also be able to do without my getCanvasURLID()
    // although it seems like the best option for its job right now

    // const [tempIDState, setTempIDState] = useState();
    let list = canvases.map(item => {
        let tmp_name = item.canvas_name
        // note that slugNum is a Number here.
        let tmp_id = item.slugNum
        console.log(tmp_name)
        console.log(tmp_id)
        console.log(typeof tmp_id)

        
        return (
            <div className="canvas" key={tmp_name}>
                <p>
                    <Link to={"/canvas/" + tmp_id} >
                        {tmp_name}
                    </Link>{" "}
                </p>
            </div>
        )
    })
    return (
        <div>
            <h3>List of canvases</h3>
            {list}
        </div>
    );
}

export default CanvasList;


// old, but working return
// return (
//     <div>
//         {loading === false && (
//             <Fragment>
//                 <p>This is canvasList; your ID is: {userID}</p>
//                 <p>Your canvases are below:</p>
//                 {canvases.map(canvas => (
//                     <h5 key={canvas.canvas_name}>{canvas.canvas_name}</h5>
//                 ))}
//             </Fragment>
//         )}
//     </div>
// );
