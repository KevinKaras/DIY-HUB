import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory} from "react-router-dom";

function Comment(props){
    
    



    return(
        <div className="Comment-Container">
            <div className="Comment-Upper">
                <div className="Commenter-Icon">
                    <img></img>
                </div>
                <div className="Commenter-Name">{props.comment.name}</div>
                <div className="Comment-Date/Time">{props.comment.creationDate}</div>
            </div>
            <div className="Comment-Lower">
                <div className="Comment-Text">{props.comment.text}</div>
            </div>
        </div>
    )
}

export default Comment;