import reducer from "./session";

// const OBTAIN = 'posts/OBTAIN'

// const obtainPosts = () => {
//     type: OBTAIN
// }

// export default grabPosts = () => async dispatch => {
//     const response = await fetch('/api/posts', {
//         headers: {
//         'Content-Type': 'application/json'
//       }})
//     const posts = await response.json();
// }


export default function reducer(state = {}, action){
    switch(action.type){
        case OBTAIN: 
        return {...state, }
    }

}