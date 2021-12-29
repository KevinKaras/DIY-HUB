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

export default function reducer(state = {}, action){
    let newState = {...state}
    switch(action.type){
        // case OBTAIN: 
        //     return action.posts
        case CREATE: 
            newState[action.like.id] = action.like
            return newState
        // case DELETE: 
        //     delete newState[action.postId] 
        //     return newState
        // case EDIT:
        //     newState[action.post.id] = action.post
        //     return newState
        
        default:
            return state
    }

}
