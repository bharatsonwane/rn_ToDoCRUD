import {all} from 'redux-saga/effects'
import userSaga from './userSagas'
import taskSaga from "./taskSagas"

export default function* rootSaga() {
    yield all([
        userSaga(),
        taskSaga(),
    ])
}