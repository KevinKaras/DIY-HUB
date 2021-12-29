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


