

const OBTAIN = 'posts/OBTAIN'
const CREATE = 'posts/CREATE'
const DELETE = 'posts/DELETE'

const delPost = (postId) => ({
    type: DELETE,
    postId
})


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

export const createPost = (userId, name, instructions, photoURL) => async dispatch => {
    const response = await fetch('api/posts/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            name,
            instructions,
            photoURL
        })
    })
    const createdPost = await response.json()
    console.log(createdPost)
    await dispatch(addPost(createdPost))
}

export const deletePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const newdeletedPost = await response.json()
    await dispatch(delPost(postId))
}
 




export default function reducer(state = {}, action){
    let newState = {}
    switch(action.type){
        case OBTAIN: 
            newState = {}
            
            for(let i = 0; i < action.posts.length; i++){
                const post = action.posts[i]
                newState[post.id] = post
                
            }
            console.log(newState)
            return newState
        case CREATE: 
            newState = {...state}
            console.log("CREATE")
            newState[action.post.id] = action.post
            return newState
        case DELETE: 
            newState = {...state}
            console.log("DELETE")
            delete newState[action.postId] 
            return newState
        default:
            return state
    }

}