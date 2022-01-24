import React, { useEffect } from "react";
import { useDispatch} from "react-redux"
import { addLike, removeLike, grabLikes } from "../store/likes";
import EmptyLike from "../components/CSS/photos/LikeButtonEmpty.png"
import FilledLike from "../components/CSS/photos/LikeButtonFilled.png"

function LikeButton(props) {
    
    const dispatch = useDispatch()

    const onLikeClick = async (e) => {                                    // CREATE                              
        await dispatch(addLike(props.LikeRequirements.PostId, props.LikeRequirements.sessionUserId, props.LikeRequirements.sessionUserUsername))
    }
    
    const onLikeUnclick = async (e) => {                                  // DELETE
        await dispatch(removeLike(props.LikeRequirements.PostId, props.LikeRequirements.sessionUserId))
    }

    const ClickHandler = async (e) => {                                   // CONDITIONAL HANDLER OF CLICK OPERATIONS
        return props.LikeRequirements.ViewerLikeState === 1 ? 
        onLikeUnclick() :
        onLikeClick()
    }
    
    useEffect(() => {
    // dispatch(grabLikes(props.LikeRequirements.PostId))
    }, [ClickHandler]);

    return ( 
        <>
            <button className="Liked-Button" onClick={e => ClickHandler(e)}>
                {props.LikeRequirements && 
                <img 
                className="LikeButtonImage"
                src={props.LikeRequirements.ViewerLikeState == 1 ? 
                    FilledLike :
                    EmptyLike
                    }
                alt={"Failed to load"}
                > 
                </img>
                }
                <div className="Like-Button-Text">LIKE</div>
            </button>
        
        </>
        
    )
}
export default LikeButton