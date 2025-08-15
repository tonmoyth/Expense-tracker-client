import axios from 'axios';
import React from 'react';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

const AxiosSecure = () => {
    return instance;
};

export default AxiosSecure;
// { origin: ['https://expense-tracker-client-ruddy.vercel.app'] }