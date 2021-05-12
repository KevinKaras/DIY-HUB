const OBTAIN = "comments/OBTAIN"
const CREATE = "comments/CREATE"


const obtainComm = (comments) => ({
    type: OBTAIN,
    comments
})

const addComm = (comment) => ({
    type: CREATE,
    comment
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
    console.log(commentData.comments)
    dispatch(obtainComm(commentData.comments))
}


export default function reducer(state = [], action){
    switch(action.type){
        case OBTAIN:
            return action.comments
        case CREATE: 
            return [...state, action.comment]
        default:
            return state;
    }

}