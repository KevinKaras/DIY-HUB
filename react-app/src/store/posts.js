

const OBTAIN = 'posts/OBTAIN'
const CREATE = 'posts/CREATE'


const addPost = (post) => ({
    type: CREATE,
    post
})



const obtainPosts = (posts) => ({
    type: OBTAIN,
    posts
})



export const grabPosts = () => async dispatch => {
    const response = await fetch('/api/posts', {
        headers: {
        'Content-Type': 'application/json'
      }})
    const data = await response.json();
    dispatch(obtainPosts(data.posts))
}

export const createPost = () => async dispatch => {
    const response = await fetch('/create')
}
 




export default function reducer(state = {}, action){
    switch(action.type){
        case OBTAIN: 
            return {...state, ...action.posts}
        case CREATE: 
            return {...state, ...action.post}
        default:
            return state
    }

}