import { UPDATE_NGROKURL, UPDATE_NGROKURL_SUCCESS, UPDATE_NGROKURL_FAILURE } from "src/Redux-actions/Types"
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
    // isLoading: false,
    // ngrokurl: null,
    // payload: null,
    ngrokurlResponse: null,
    // ngrokurlError: "",
}

export const ngrokReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NGROKURL:
            AsyncStorage.setItem('ngrokUrl', action.payload);
            return {
                // ...state, isLoading: true, payload: action.payload, 
                ngrokurlResponse: action.payload,
                // ngrokurlError: null
            }

        // case UPDATE_NGROKURL: return {
        //     ...state, isLoading: false, ngrokurlResponse: action.payload
        // }

        // case UPDATE_NGROKURL: return {
        //     ...state, isLoading: false, ngrokurlError: action.payload
        // }

        default: return { ...state }
    }
}



