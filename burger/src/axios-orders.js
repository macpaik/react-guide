import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-8d8dc.firebaseio.com/'
});

export default instance;