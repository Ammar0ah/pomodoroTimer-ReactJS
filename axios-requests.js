import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://pomodoro.free.beeceptor.com/'
});

export default instance;
