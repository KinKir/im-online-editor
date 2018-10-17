import axios from 'axios';

let instance = axios.create({
    baseURL: '/api',
    timeout: 30e3,
})

export default {
    login({ name, password }) {
        return instance('/login', {
            method: "POST",
            data: {
                name: name.trim(),
                password
            }
        });
    },
    register({ name, password }) {
        return instance('/register', {
            method: "POST",
            data: {
                name: name.trim(),
                password
            }
        });
    },
    getUserList(name) {
        return instance('/userlist', {
            method: "GET",
            params: {
                name: name.trim(),
            }
        });
    }
}