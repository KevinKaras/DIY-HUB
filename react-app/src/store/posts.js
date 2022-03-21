

const OBTAIN = 'posts/OBTAIN'
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

const obtainPosts = (posts, category) => ({
    type: OBTAIN,
    posts,
    category
})


// -------------------------------------------------------------------------------------------------------------- GET POSTS/POST

export const grabPosts = (category) => async dispatch => {
    const response = await fetch(`/api/posts/${category}`, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log("THIS IS DATA COMING BACK FROM ROUTE TO ADD", data)
    dispatch(obtainPosts(data, category))
}


// --------------------------------------------------------------------------------------------------------------- POST NEW-POST

export const createPost = (userid, name, instructions, url, category) => async dispatch => {
    
    const formData = new FormData();
    formData.append("image", url);
    formData.append("userid", userid)
    formData.append("name", name)
    formData.append("instructions", instructions)
    formData.append("category", category)
    
    const response = await fetch('/api/posts/create', {
        method: "POST",
        body: formData
    })
    const createdPost = await response.json()
    console.log(createdPost)
    await dispatch(addPost(createdPost))
    return createdPost
}

// ------------------------------------------------------------------------------------------------------------- EDIT POST

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

// --------------------------------------------------------------------------------------------------------------- DELETE POST

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
 



// ---------------------------------------------------------------------------------------------------------------------
export default function reducer(state = {}, action){
    let newState = {...state}
    switch(action.type){
        case OBTAIN: 
            console.log(action.posts)
            newState[action.category] = [...action.posts[action.category]]
            return newState
        case CREATE: 
            newState[action.post.id] = action.post
            return newState
        case DELETE: 
            delete newState[action.postId] 
            return newState
        case EDIT:
            newState[action.post.id] = action.post
            return newState
        default:
            return state
    }
}