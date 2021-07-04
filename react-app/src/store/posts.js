

const OBTAIN = 'posts/OBTAIN'
const PROFILEPOSTS = "posts/PROFILEPOSTS"
const CREATE = 'posts/CREATE'
const DELETE = 'posts/DELETE'
const EDIT = 'posts/EDIT'

const editPost = (post) => ({
    type: EDIT,
    post
})

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

const profilePosts = (posts) => ({
    type: PROFILEPOSTS,
    posts
})

export const profilePostGrab = (userId) => async dispatch => {
    const response = await fetch(`/api/posts/profile/${userId}`, {
        headers: {
            'Content-Type': "application/json"
        }})

    const allProfilePosts = await response.json()
    
    dispatch(profilePosts(allProfilePosts.posts))
    return allProfilePosts.posts
}



export const modifyPost = (postId, userId, name, instructions, url) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/edit`, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            userId,
            name,
            instructions,
            url
        })
    })
    const updatedPost = await response.json()
    console.log(updatedPost)
    dispatch(editPost(updatedPost))
    return updatedPost
}


export const grabPosts = () => async dispatch => {
    const response = await fetch('/api/posts/', {
        headers: {
        'Content-Type': 'application/json'
      }})
    const data = await response.json();
    dispatch(obtainPosts(data.posts))
}

export const createPost = (userId, name, instructions, url) => async dispatch => {
    
    const response = await fetch('/api/posts/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            name,
            instructions,
            url
        })
    })
    if(response.ok){
        console.log("something")
    }
    const createdPost = await response.json()
    console.log("this is the thunk: " , createdPost)
    await dispatch(addPost(createdPost))
    return createdPost
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
            return newState
        case CREATE: 
            newState = {...state}
            newState[action.post.id] = action.post
            return newState
        case DELETE: 
            newState = {...state}
            delete newState[action.postId] 
            return newState
        case EDIT:
            newState = {...state}
            newState[action.post.id] = action.post
            return newState
        case PROFILEPOSTS:
            newState = {...state}
            for(let i = 0; i < action.posts.length; i++){
               const post = action.posts[i]
               newState[post.id] = post
            }
            return newState
        default:
            return state
    }

}