import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory} from "react-router-dom";

function Comment(props){
    // grab states here, to work with info later
    // Props should equal this 
    // prop.CommentUserPackage = {
        // "comment": {id:, postid:, userid:, commentText:}
        // "user" : {id:, username:, email}
    // }
    console.log(props.commentCombo)
    
    



    return (
        <>
        { props.commentCombo &&
        <div className="Comment-Container">
            <div className="Comment-Upper">
                <div className="Commenter-Icon">
                    <img src={props?.commentCombo?.user?.url}></img>
                </div>
                <div className="Commenter-Name">{props?.commentCombo?.comment?.name}</div>
                <div className="Comment-Date-Time">{props?.commentCombo?.comment?.creationDate}</div>
            </div>
            <div className="Comment-Lower">
                <div className="Comment-Text">{props?.commentCombo?.comment?.commentText}</div>
            </div>
        </div>
        }
        </>
    )
}

export default Comment;