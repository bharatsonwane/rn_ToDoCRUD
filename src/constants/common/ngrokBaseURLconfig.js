// api url for ngrok

export const getNgrokApiUrl = (store) => {
    let ngrokUrl = store.getState().NgrokReducer.ngrokurlResponse
    return ngrokUrl
}
