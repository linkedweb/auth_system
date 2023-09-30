import axios from 'axios';
import { useParams } from "react-router-dom";
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT,
    CREATE_PROFILE_FAIL,
    CREATE_PROFILE_SUCCESS,
    USER_PROFILE_LOADED_FAIL,
    USER_PROFILE_LOADED_SUCCESS
} from './types';



export const load_user = () => async dispatch => {
    console.log(localStorage.getItem('access'));
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            console.log('inside try');
            console.log(config);
            const res = await axios.get(`http://localhost:8000/auth/users/me/`, config);
            console.log('get request done');
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            console.error(err.response.data);
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};



export const checkAuthenticated = () => async dispatch => {
    console.log('checking_authentication');
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: localStorage.getItem('access') });
        console.log(body);

        try {
            const res = await axios.post('http://localhost:8000/auth/jwt/verify/', body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });
    // console.log(body);
    try {
        const res = await axios.post('http://localhost:8000/auth/jwt/create/', body, config);
        console.log('checking email');
        console.log(res);
        console.log(res.data);
        console.log(res.data.access);
        console.log('checking email');
        console.log(res.body);
        console.log(email);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                data: res.data,
                email: email
            }
        });
        dispatch(load_user());
    } catch (err) {
        console.log(err);
        dispatch({
            type: LOGIN_FAIL
        })
    }
};

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, email, password, re_password });
    console.log(body);
    try {
        const res1 = await axios.get('google.com',config);
        console.log(res1);
        const res = await axios.post('http://localhost:8000/auth/users/', body, config);
        console.log('request posted');
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        console.log('payload dispatched');
    } 
    catch (err) {
        console.log(err)
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post('http://localhost:8000/auth/users/activation/', body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post('http://localhost:8000/auth/users/reset_password/', body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post('http://localhost:8000/auth/users/reset_password_confirm/', body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};


export const googleAuthenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post('http://localhost:8000/auth/o/google-oauth2/?${formBody}', config);

            dispatch({
                type: GOOGLE_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());
        } catch (err) {
            dispatch({
                type: GOOGLE_AUTH_FAIL
            });
        }
    }
};

export const facebookAuthenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post('http://localhost:8000/auth/o/facebook/?${formBody}', config);

            dispatch({
                type: FACEBOOK_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());
        } catch (err) {
            dispatch({
                type: FACEBOOK_AUTH_FAIL
            });
        }
    }
};


// create-profile-function 
export const createprofile = (name, email, contact, designation, organization, radiodetails,
    radiosetdetails) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, contact, designation, organization, radiodetails,
        radiosetdetails });
    console.log(body);
    try {
        //
        const res = await axios.post('http://localhost:8000/profiles/create/', body, config);
        console.log('request posted');
        dispatch({
            type: CREATE_PROFILE_SUCCESS,
            payload: res.data.name
        });
        // dispatch(load_profile());
        console.log('payload dispatched');
    } 
    catch (err) {
        console.error(err.response.data);
        dispatch({
            type: CREATE_PROFILE_FAIL
        })
    }
};



// profile
export const loadUserProfile = (email) => async dispatch => {
    console.log('load_profile');
    console.log(email);
    // console.log(localStorage.getItem('access'))
    // if (localStorage.getItem('access')) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    //     'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                }; 
    try {
        console.log('inside-loaduserprof1');
        // const {name} = useParams();
        // const encodedName = encodeURIComponent(name);
        const url = `http://localhost:8000/user/profile/${email}/`;
        console.log(url);
        const res = await axios.get(`http://localhost:8000/user/profile/${email}/`, config);
        console.log('inside-loaduserprof2');
        // console.log(res.data);
        dispatch({
            type: USER_PROFILE_LOADED_SUCCESS,
            payload: res.data,
        });
        console.log('payload dispatched inside-loaduserprof2');
    } catch (err) {
        console.error(err);
        dispatch({
            type: USER_PROFILE_LOADED_FAIL,
        });
    // }
    }
};


