

const CREATE = 'session/create';

const DESTROY = 'session/destroy'

const createSession = user => ({
  type: CREATE,
  user
})

const destroySession = () => ({
  type: DESTROY
})

export const authenticate = () => async dispatch => {
  const response = await fetch('/api/auth/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const user = await response.json();
  if(!user.errors) {dispatch(createSession(user))}
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const user = await response.json();
  if (!user.errors) {
    return dispatch(createSession(user))
  }
  return user;
}

export const logout = () => async dispatch => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  dispatch(destroySession())
  return await response.json();
};


export const signUp = (username, email, password, url) => async dispatch => {

  const formData = new FormData();
    formData.append("username", username)
    formData.append("email", email)
    formData.append("password", password);
    formData.append("image", url)

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: formData
  });
  const user = await response.json();
  console.log(user)
  dispatch(createSession(user));
  
}

 

export default function reducer(state = { user: null, loaded: false}, action){
  switch(action.type){
    case CREATE:
      return {...state, user: action.user, loaded: true}
    case DESTROY:
      return {...state, user: null, loaded: true};
    default:
      return state;
  }
}