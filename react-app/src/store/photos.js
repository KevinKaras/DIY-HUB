
const OBTAIN = 'photo/OBTAIN'

const obtainPhotos = (photos) => ({
    type: OBTAIN,
    photos
})


export const grabPhoto = (id) => async dispatch => {
    
    const response = await fetch(`/api/photos/${id}`)
    
    const data = await response.json();
        
    dispatch(obtainPhotos(data))
        

}

export default function reducer(state = {}, action){
    switch(action.type){
        case OBTAIN:
            return {...state, ...action.photos}
        default:
            return state
    }

}

