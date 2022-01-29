import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory} from "react-router-dom";
import './CSS/PostPage.css'

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
        <div className="Comment">
            <div className="Comment-Container">
                <div className="Comment-Upper">
                    <div className="Commenter-Icon">
                            <img className="Commenter-Icon-Img" src={props?.commentCombo?.user?.url}></img>
                    </div>
                    <div className="Commenter-Name">{props?.commentCombo?.user?.username}</div>
                    <div className="Comment-Date-Time">{props?.commentCombo?.comment?.creationDate}</div>
                </div>
                <div className="Comment-Lower">
                    <div className="Comment-Text">{props?.commentCombo?.comment?.commentText}</div>
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default Comment;