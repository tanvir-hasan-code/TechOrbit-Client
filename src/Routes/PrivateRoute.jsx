import React from 'react';
import useAuth from '../Hooks/useAuth';
import PrimaryLoaderPage from '../LoadingPages/PrimaryLoaderPage';
import {  Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <PrimaryLoaderPage/>
	}

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}


	return children;
};

export default PrivateRoute;