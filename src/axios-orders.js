import axios from 'axios';

const instance = axios.create({
    baseURL:'https://vovanium-burger.firebaseio.com/'
})

export default instance;

