import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from "../Redux-reducers/rootReducer"
import rootSaga from '../Redux-sagas-middleware/index'

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the store
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
    )

// then run the saga
sagaMiddleware.run(rootSaga)    


export default store