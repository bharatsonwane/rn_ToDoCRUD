import {
    USER_SIGNIN, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE,
    USER_AUTH_STATUS, USER_AUTH_STATUS_SUCCESS, USER_AUTH_STATUS_FAILURE,
    USER_SIGNOUT, USER_SIGNOUT_SUCCESS, USER_SIGNOUT_FAILURE,
} from "src/Redux-actions/Types"
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
    isLoading: false,
    payload: null,
    signInResponce: null,
    signInError: null,
    authToken: null,
    signOutResponce: null,
    signOutError: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNIN: return {
            ...state, isLoading: true, payload: action.payload, signInResponce: null, signInError: null
        }
        case USER_SIGNIN_SUCCESS:
            // set the auth in asyncStorage
            AsyncStorage.setItem('userToken', action.payload.data);
            return {
                ...state, isLoading: false, signInResponce: action.payload, authToken: action.payload
            }
        case USER_SIGNIN_FAILURE: return {
            ...state, isLoading: false, signInError: action.payload
        }


        case USER_AUTH_STATUS: return {
            ...state, isLoading: true, authToken: null
        }
        case USER_AUTH_STATUS_SUCCESS: return {
            ...state, isLoading: false, authToken: action.payload
        }
        case USER_AUTH_STATUS_FAILURE: return {
            ...state, isLoading: false
        }


        case USER_SIGNOUT: return {
            ...state, isLoading: true, signOutResponce: null, signOutError: null
        }
        case USER_SIGNOUT_SUCCESS: return {
            ...state, isLoading: false, authToken: null, signOutResponce: action.payload
        }
        case USER_SIGNOUT_FAILURE: return {
            ...state, isLoading: false, signOutError: action.payload
        }

        default: return { ...state }
    }
}
