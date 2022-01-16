const PROFILEPOSTS = "posts/PROFILEPOSTS"


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


export default function reducer(state = [], action){
    let newState = [...state]
    switch(action.type){
        case PROFILEPOSTS:
            newState = [...state]
            action.posts.forEach(post => newState.push(post))

            return newState
        default:
            return state
    }

}