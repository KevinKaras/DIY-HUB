const OBTAIN = 'likes/OBTAIN'
const CREATE = 'likes/CREATE'
const DELETE = 'likes/DELETE'


const delLike = (likeId) => ({
    type: DELETE,
    likeId
})


const addLike = (like) => ({
    type: CREATE,
    like
})

const obtainLikes = (likes) => ({
    type: OBTAIN,
    likes
})