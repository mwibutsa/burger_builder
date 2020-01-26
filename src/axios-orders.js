import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mwibusta-react-firebase.firebaseio.com/',
});

export default instance;
