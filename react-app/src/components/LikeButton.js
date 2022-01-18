import React, { useEffect } from "react";
import { useDispatch} from "react-redux"
import { addLike, removeLike } from "../store/likes";

function LikeButton(props) {
    
    const dispatch = useDispatch()
    console.log(props)

    const onLikeClick = async (e) => {                                    // CREATE                               
        await dispatch(addLike(props.LikeRequirements.PostId, props.LikeRequirements.sessionUserId, props.LikeRequirements.sessionUserUsername))
    }
    
    const onLikeUnclick = async (e) => {                                  // DELETE
        await dispatch(removeLike(props.LikeRequirements.PostId, props.LikeRequirements.sessionUserId))
    }

    const ClickHandler = async (e) => {
        return props.LikeRequirements.ViewerLikeState === 1 ? 
        onLikeUnclick() :
        onLikeClick()
    }
    
    useEffect(() => {
    }, []);

    return ( 
        <>
            <button className="Liked-Button" onClick={e => ClickHandler(e)}>
                {props.LikeRequirements && 
                <img 
                className="LikeButtonImage"
                src={props.LikeRequirements.ViewerLikeState == 1 ? 
                    'https://www.pinclipart.com/picdir/big/80-800346_blue-clip-art.png' :
                    "FAILURE"
                    }
                alt={"failing"}
                > 
                </img>
                }
                <div className="Like-Button-Text">LIKE</div>
            </button>
        
        </>
        
    )
}
export default LikeButton