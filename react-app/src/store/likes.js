const OBTAIN = 'likes/OBTAIN'
const GATHERALL = 'likes/GATHERALL'
const CREATE = 'likes/CREATE'
const DELETE = 'likes/DELETE'
const DESTROY = 'likes/DESTROY'


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

// const GatherPostsLikes = (allLikes) => ({
//     type: GATHERALL,
//     allLikes
// })

const delAllLikes = (postId) => ({
    type: DESTROY,
    postId
})




export const grabLikes = (postId) => async dispatch => {
    const response = await fetch(`/api/likes/get/${postId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const listOfLikes = await response.json();
    let ArrayOfLikes = Object.values(listOfLikes)
    dispatch(obtainPostLikes(ArrayOfLikes))
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
    dispatch(delLike(removedLike.id))
}

export const deleteAllLikes = (postId) => async dispatch => {
    const response = await fetch(`/api/likes/destroy/${postId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const removedPostId = response.json();
    console.log(removedPostId)
    dispatch(delAllLikes(postId))
}



// export default function reducer(state = {}, action){
//     let newState = {...state}
//     switch(action.type){
//         case OBTAIN: 
//             return action.likes
//         case CREATE: 
//             newState[action.like.id] = action.like
//             return newState
//         case DELETE: 
//             delete newState[action.likeId] 
//             return newState
//         default:
//             return state
//     }

// }

export default function reducer(state = [], action){
    let newState = [...state]
    switch(action.type){
        case OBTAIN: 
            return action.likes //change return to array
        case CREATE: 
            newState.push(action.like) 
            return newState
        case DELETE: 
            return newState.filter(like => !(like.id == action.likeId))
        case DESTROY:
            return newState.filter(like => !(like.postid == action.postId))
        default:
            return state
    }

}


// FILTER OUT THE LIKE FROM THE STATE SO IT HOPEFULLY FIXES THE RERENDERING ISSUE IN THE FRONT
