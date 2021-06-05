const masterCredential = {
    username: "bharat",
    password: "eteva",
}

export const checkCredential = (payload) => {
    const { username, password } = payload
    if (masterCredential.username !== username) {
        let error = {data: "Invalid Username and Password"}
        throw error
    }
    else if (masterCredential.password !== password) {
        let error = {data: "Invalid Password"}
        throw error
    }
    else if (masterCredential.username === username && masterCredential.password === password) {
        let response = { data: "Loging SucessFully and Providing Token nekoT9876543210" }
        return response
    }
}