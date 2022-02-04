const OBTAIN = "comments/OBTAIN"
const CREATE = "comments/CREATE"
const EDIT = "comments/EDIT"
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

const editComm = (comment, oldId) => ({
    type: EDIT,
    comment,
    oldId
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
    dispatch(addComm(madeComment))
}

export const editComment = (userid, postid, commentid, commentText) => async dispatch => {
    const response = await fetch(`/api/posts/${postid}/comments/edit/${commentid}`,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            userid, 
            postid, 
            commentid, 
            commentText
        })
    })

    const remadeComment = await response.json()
    dispatch(editComm(remadeComment, commentid))
}




export const grabComments = (postId) => async dispatch =>{
    const response = await fetch(`/api/posts/${postId}/comments`, {
        headers: {
            "Content-Type": "application/json"
        }})
    const commentData = await response.json()
    dispatch(obtainComm(commentData.comments))
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


export default function reducer(state = {}, action){
    switch(action.type){
        case OBTAIN:
            return {...action.commentInfo}
        case CREATE: 
            state[action.comment.comment.id] = action.comment
            return {...state}
        case EDIT:
            delete state[action.oldId]
            state[action.comment.comment.id] = action.comment
            return {...state}
        case DELETE:
            delete state[action.commentId]
            return {...state}
        case REMOVAL:
            // REFACTOR THIS, THIS COULD BE CLEANER =============================================================
            Object.entries(state)
            .forEach((key, value) => 
            {if(key[1].comment.postid == action.postId){
                delete key[1]
            }}
            )
            return {...state}
        default:
            return state;
    }
}

// export default function reducer(state = {}, action){
//     let newState = {...state}
//     switch(action.type){
//         case OBTAIN:
//             return {...action.commentInfo}
//         case CREATE: 
//             return [...state, action.comment]
//         case EDIT:
//             let filteredState = [...state.filter(state => state.comment.id != action.oldId)]
//             filteredState.push(action.comment)
//             return filteredState
//         case DELETE:
//             return [...state.filter(state => state.comment.id !== Number(action.commentId))]
//         case REMOVAL:
//             return [...state.filter(state => state.postid !== Number(action.postId))]
//         default:
//             return state;
//     }

// }