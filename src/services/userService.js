import axios from 'axios';
import { url } from './config';

async function login({email, password}){
    let response = await axios.get(url + '/login', {
        params: {
            password: encodeURIComponent(password),
            email: encodeURIComponent(email)
        },
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })
    return response.data
}

const userService={
    login: login,
};

export default userService;