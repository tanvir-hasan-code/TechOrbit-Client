import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
	baseURL: "http://localhost:5000",
	withCredentials: true
})

const useAxiosSecure = () => {

	const { user, logOut } = useAuth();
	const Token = user?.accessToken;
	const navigate = useNavigate();

	axiosSecure.interceptors.request.use((config) => {
		config.headers.Authorization = `Bearer ${Token}`
		return config;
	}, (error) => {
		return Promise.reject(error)
	})

	axiosSecure.interceptors.response.use((config) => {
		return config;
	}, (error) => {
		const status = error.status;
		if (status === 503) {
			navigate("/forbidden403")
		} else if (status === 403) {
			logOut().then(() => {
				navigate("/login")
			})
			.catch(()=>{})
		}
	})



	return axiosSecure;
};


export default useAxiosSecure;