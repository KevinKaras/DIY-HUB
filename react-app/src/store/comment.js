const OBTAIN = "comments/OBTAIN"
const CREATE = "comments/CREATE"
const DELETE = "comments/DELETE"
const REMOVAL = "comments/REMOVAL"

const obtainComm = (commentInfo) => ({
    type: OBTAIN,
    commentInfo
})

const addComm = (comment) => ({
    type: CREATE,
    comment
})

const delComm = (commentId) => ({
    type: DELETE,
    commentId
})

const allDelComm = (postId) => ({
    type: REMOVAL,
    postId
})

export const addComment = (userid, postid, commentText) => async dispatch => {
    const response = await fetch(`/api/posts/${postid}/comments/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userid,
            postid,
            commentText
        })
    })
    const madeComment = await response.json()
    console.log("this is the comment: " + madeComment)
    dispatch(addComm(madeComment))
}




export const grabComments = (postId) => async dispatch =>{
    const response = await fetch(`/api/posts/${postId}/comments`, {
        headers: {
            "Content-Type": "application/json"
        }})
    const commentData = await response.json()
    
    dispatch(obtainComm(commentData.comments))
    // dispatch(obtainComm(commentData))
}

export const deleteComment = (postId, commentId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/comments/${commentId}/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const deletedComment = await response.json()
    dispatch(delComm(commentId))
}

export const deleteAllComments = (postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/comments/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const deletedComments = await response.json()
    dispatch(allDelComm(postId))
}


export default function reducer(state = [], action){
    switch(action.type){
        case OBTAIN:
            return action.commentInfo
        case CREATE: 
            console.log("THIS IS THE STATE: ", state, action.comment)
            return [...state, action.comment]
        case DELETE:
            return [...state.filter(state => state.comment.id !== Number(action.commentId))]
        case REMOVAL:
            return [...state.filter(state => state.postid !== Number(action.postId))]
        default:
            return state;
    }

}