import { takeEvery, all, call, put, select, delay } from "redux-saga/effects"
import { USER_SIGNIN, USER_AUTH_STATUS, USER_SIGNOUT } from '../Redux-actions/Types'
import { userSignInActions, userAuthStatusActions, userSignOutActions } from '../Redux-actions'
import { checkCredential } from "../utils/server/CheckCredential"
import AsyncStorage from '@react-native-async-storage/async-storage';


export const reducerModel = (state) => state.UserReducer

// // user login
const SignInServer = async (payload) => {
    const request = checkCredential(payload) // api request which gives response token
    return request
}


function* SignInSaga() {
    let model = yield select(reducerModel)
    if (model.payload) {
        try {
            const response = yield call(SignInServer, model.payload)
            if (response) {
                yield delay(300)
                yield put(userSignInActions.signInSuccess(response))
            }
        } catch (error) {
            yield put(userSignInActions.signInFailure(error))
        }
    }
}


// // user Auth Status
const userAuthStatusServer = async () => {
    let userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken)
    if (userToken) {
        return userToken
    } else {
        let error = "Token is not available"
        throw error
    }
}


function* userAuthStatusSaga() {
    try {
        const response = yield call(userAuthStatusServer)
        if (response) {
            yield delay(300)
            yield put(userAuthStatusActions.authSuccess(response))
        }
    } catch (error) {
        yield put(userAuthStatusActions.authFailure(error))
    }
}



// // user signout
const signOutServer = async () => {
    await AsyncStorage.removeItem('userToken');
    let signOutResponce = "Successfully sign Out"
    return signOutResponce
}


function* signOutSaga() {
    try {
        const response = yield call(signOutServer)
        if (response) {
            yield delay(300)
            yield put(userSignOutActions.signOutSuccess(response))
        }
    } catch (error) {
        yield put(userSignOutActions.signOutFailure(error))
    }
}


export const userSaga = [
    takeEvery(USER_SIGNIN, SignInSaga),
    takeEvery(USER_AUTH_STATUS, userAuthStatusSaga),
    takeEvery(USER_SIGNOUT, signOutSaga),
]

export default function* rootSaga() {
    yield all([...userSaga])
}