import axios from "axios"

const http = () => {
    return {
        post,
        get,
        auth
    }
}

const post = (url: string, token: string, body: Object) => {
    let request = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })

    return request.post(url, body)
}

const get = (url: string, token: string) => {
    let request = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })

    return request.get(url)
}

const auth = (login: string, senha: string) => {
    let request = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return request.post('/auth', {login, senha})
}

export default http