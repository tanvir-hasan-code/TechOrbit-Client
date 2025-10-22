import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
	baseURL: "http://localhost:5000",
	withCredentials: true
})

const useAxiosSecure = () => {

	const { user } = useAuth();
	const Token = user?.accessToken;

	axiosSecure.interceptors.request.use((config) => {
		config.headers.Authorization = `Bearer ${Token}`
		return config;
	}, (error) => {
		return Promise.reject(error)
	})



	return axiosSecure;
};


export default useAxiosSecure;