const OBTAIN = 'likes/OBTAIN'
const GETALL = 'likes/GETALL'
const CREATE = 'likes/CREATE'
const DELETE = 'likes/DELETE'


const delLike = (likeId) => ({
    type: DELETE,
    likeId
})


const createLike = (like) => ({
    type: CREATE,
    like
})

const obtainPostLikes = (likes) => ({
    type: OBTAIN,
    likes
})

const obtainPostsLikes = (allLikes) => ({
    type: GETALL,
    allLikes
})

export const grabLikes = (postId) => async dispatch => {
    const response = await fetch(`/api/likes/get/${postId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const listOfLikes = await response.json();
    console.log(listOfLikes)
    dispatch(obtainPostLikes(listOfLikes))
}

export const addLike = (postId, sessionUserId, sessionUsername) => async dispatch => {
    const response = await fetch('/api/likes/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postId,
            sessionUserId, 
            sessionUsername
        })
    })
    const likeObject = await response.json();
    console.log(likeObject)
    dispatch(createLike(likeObject))
}

export const removeLike = (postId, sessionUserId) => async dispatch => {
    const response = await fetch(`/api/likes/remove/${postId}/${sessionUserId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const removedLike = await response.json();
    console.log(removedLike)
    dispatch(delLike(removedLike.id))
}



export default function reducer(state = {}, action){
    let newState = {...state}
    switch(action.type){
        case OBTAIN: 
            return action.likes
        case CREATE: 
            newState[action.like.id] = action.like
            return newState
        case DELETE: 
            delete newState[action.likeId] 
            return newState
        default:
            return state
    }

}
