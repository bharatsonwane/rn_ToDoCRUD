import { UPDATE_NGROKURL } from "../Redux-actions/Types"

// // UPDATE NGROK URL ACTION
export const updateNgrokurlAction = (model) => ({
    type: UPDATE_NGROKURL, payload: model
})
// export const updateNgrokurlSuccessAction = (response) => ({
//     type: UPDATE_NGROKURL_SUCCESS, payload: response
// })
// export const updateNgrokurlFailureAction = (error) => ({
//     type: UPDATE_NGROKURL_FAILURE, payload: error
// })