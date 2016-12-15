import { browserHistory } from 'react-router';
import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER,FETCH_MESSAGE} from './type';
const ROOT_URL = 'http://localhost:3000';


export function signinUser({email, password}) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password})
      .then(response =>{
        // If request is good
        // - Update state to indicate user is authenticated
        dispatch({type: AUTH_USER});

        // - save the JWT token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('gender', response.data.gender);
        localStorage.setItem('interest', response.data.interest);
        localStorage.setItem('age', response.data.age);

        //- rediect to the route '/feature'
        browserHistory.push('/watch')
      })
      .catch(() => {
        // If request is bad ...
        // - Show an error to the user
        dispatch(authError('Bad login info'));
      });
  }
}

export function signupUser({email, password, gender, age, interest}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password, gender, age, interest})
      .then(response =>{
        dispatch({type: AUTH_USER});
        localStorage.setItem('token', response.data.token);


        browserHistory.push('/watch');
      }).catch(response => {

        //dispatch(authError(response.data.error))
        dispatch(authError('Email is in use'));
        });
  }
}
export function authError(error) {
  return{
    type: AUTH_ERROR,
    payload: error
  };
}


export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return { type: UNAUTH_USER};
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      });
  }
}
