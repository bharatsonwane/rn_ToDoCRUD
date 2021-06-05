import {
    USER_SIGNIN, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE,
    USER_AUTH_STATUS, USER_AUTH_STATUS_SUCCESS, USER_AUTH_STATUS_FAILURE,
    USER_SIGNOUT, USER_SIGNOUT_SUCCESS, USER_SIGNOUT_FAILURE,
    USER_SIGNUP, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE,
    USER_FORGOT_PAASWORD, USER_FORGOT_PAASWORD_SUCCESS, USER_FORGOT_PAASWORD_FAILURE,
    USER_CHANGE_PASSWORD, USER_CHANGE_PASSWORD_SUCCESS, USER_CHANGE_PASSWORD_FAILURE,
    USER_INFO, USER_INFO_SUCCESS, USER_INFO_FAILURE,
    USER_INFO_UPDATE, USER_INFO_UPDATE_SUCCESS, USER_INFO_UPDATE_FAILURE,
} from './Types'

// login actions 
export const userSignInActions = {
    SignIn: model => ({ type: USER_SIGNIN, payload: model, }),
    signInSuccess: response => ({ type: USER_SIGNIN_SUCCESS, payload: response }),
    signInFailure: error => ({ type: USER_SIGNIN_FAILURE, payload: error })
}

export const userAuthStatusActions = {
    authStatus: model => ({ type: USER_AUTH_STATUS, payload: model }),
    authSuccess: response => ({ type: USER_AUTH_STATUS_SUCCESS, payload: response }),
    authFailure: error => ({ type: USER_AUTH_STATUS_FAILURE, payload: error })
}

export const userSignOutActions = {
    signOut: model => ({ type: USER_SIGNOUT, payload: model, }),
    signOutSuccess: response => ({ type: USER_SIGNOUT_SUCCESS, payload: response }),
    signOutFailure: error => ({ type: USER_SIGNOUT_FAILURE, payload: error })
}

export const userSignUpActions = {
    signUp: model => ({ type: USER_SIGNUP, payload: model }),
    signUpSuccess: response => ({ type: USER_SIGNUP_SUCCESS, payload: response }),
    signUpFailure: error => ({ type: USER_SIGNUP_FAILURE, payload: error })
}

export const userForgotPasswordActions = {
    forgotPassword: model => ({ type: USER_FORGOT_PAASWORD, payload: model }),
    forgotPasswordSuccess: response => ({ type: USER_FORGOT_PAASWORD_SUCCESS, payload: response }),
    forgotPasswordFailure: error => ({ type: USER_FORGOT_PAASWORD_FAILURE, payload: error }),
}

export const userChangePasswordActions = {
    changePassword: model => ({ type: USER_CHANGE_PASSWORD, payload: model }),
    changePasswordSuccess: response => ({ type: USER_CHANGE_PASSWORD_SUCCESS, payload: response }),
    changePasswordFailure: error => ({ type: USER_CHANGE_PASSWORD_FAILURE, payload: error })
}

export const userInfoActions = {
    userInfo: model => ({ type: USER_INFO, payload: model }),
    userInfo: response => ({ type: USER_INFO_SUCCESS, payload: response }),
    userInfo: error => ({ type: USER_INFO_FAILURE, payload: error })
}

export const userInfoUpdateActions = {
    userInfo: model => ({ type: USER_INFO_UPDATE, payload: model }),
    userInfo: response => ({ type: USER_INFO_UPDATE_SUCCESS, payload: response }),
    userInfo: error => ({ type: USER_INFO_UPDATE_FAILURE, payload: error })
}