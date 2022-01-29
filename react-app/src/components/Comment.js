import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory} from "react-router-dom";
import { deleteComment } from '../store/comment'

import './CSS/PostPage.css'

function Comment(props){
    let [dotStatus, setDotStatus] = useState(false)
    let sessionUser = useSelector(state => state.session.user)
    let dispatch = useDispatch()

    const onDeleteComment = async (e) => {               // DELETE
        e.preventDefault()
        await dispatch(deleteComment(props?.commentCombo?.comment?.postid, props?.commentCombo?.comment?.id))
    }
    
    const DotHandler = async (e) => {
        e.preventDefault()
        if(dotStatus){
            console.log(dotStatus)
            setDotStatus(false)
        } else {
            console.log(dotStatus)
            setDotStatus(true)
        }
    }

    useEffect(()=> {

    }, [])

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
                    { sessionUser?.id == props?.commentCombo?.user?.id &&
                        <div className="Drop-Down-Dots-Container">
                            <button className="Drop-Down-Dots" onClick={(e) => DotHandler(e)}>...</button> 
                            <div className={dotStatus ? 
                                            'Drop-Down-Dots-Content-Show' :
                                            'Drop-Down-Dots-Content-Hidden' }>
                                <button className="Drop-Down-Dot-Edit">Edit</button>
                                <button className="Drop-Down-Dot-Delete" onClick={(e) => {onDeleteComment(e)}}>Delete</button>
                            </div>
                        </div>
                    }
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