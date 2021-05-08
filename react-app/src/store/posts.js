

const OBTAIN = 'posts/OBTAIN'

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


export default function reducer(state = {}, action){
    switch(action.type){
        case OBTAIN: 
            return {...state, ...action.posts}
        default:
            return state
    }

}