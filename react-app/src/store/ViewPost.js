import Post from "../components/Post"

const GETONE = 'viewpost/GETONE'

const grabViewPost = (PostAuthorCombo) => ({
    type: GETONE,
    PostAuthorCombo
})

export const getViewPost = (postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`, {
        headers: {
            'Content-Type' : 'application/json'
        
    }})
    const PostAuthorCombo = await response.json()
    console.log("THIS IS POST AUTHOR COMBO", PostAuthorCombo)
    dispatch(grabViewPost(PostAuthorCombo))
}

export default function reducer(state = {}, action){
    let newState = {...state}
    switch(action.type){
        case GETONE: 
            return action.PostAuthorCombo
        // case CREATE: 
        //     return newState
        // case DELETE: 
        //     return newState
        // case EDIT:
        //     return newState
        default:
            return state
    }
}