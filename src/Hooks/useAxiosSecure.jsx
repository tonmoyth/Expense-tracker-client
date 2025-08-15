import axios from 'axios';
import React from 'react';

const instance = axios.create({
  baseURL: 'https://expense-tracker-server-black.vercel.app',
});

const AxiosSecure = () => {
    return instance;
};

export default AxiosSecure;