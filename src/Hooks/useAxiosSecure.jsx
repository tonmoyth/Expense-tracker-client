import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://expense-tracker-server-black.vercel.app',
});

const AxiosSecure = () => {
    return instance;
};

export default AxiosSecure;
