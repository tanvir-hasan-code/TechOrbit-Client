import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
	baseURL: "http://localhost:5000",
	withCredentials: true
})

const useAxiosSecure = () => {

	axiosSecure.interceptors.request.use((config) => {
		return config;
	}, (error) => {
		return Promise.reject(error)
	})



	return axiosSecure;
};


export default useAxiosSecure;