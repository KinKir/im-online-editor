import axios from 'axios';

let instance = axios.create({
    baseURL: '/',
    timeout: 30e3,
})

export default {
    login({ name, password }) {
        return instance('/api/login', {
            method: "POST",
            data: {
                name: name.trim(),
                password
            }
        });
    },
    register({ name, password }) {
        return instance('/api/register', {
            method: "POST",
            data: {
                name: name.trim(),
                password
            }
        });
    },
    getUserList(name) {
        return instance('/api/userlist', {
            method: "GET",
            params: {
                name: name.trim(),
            }
        });
    }
}