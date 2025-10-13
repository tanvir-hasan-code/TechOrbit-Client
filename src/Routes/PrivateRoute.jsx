import React from 'react';
import useAuth from '../Hooks/useAuth';
import PrimaryLoaderPage from '../LoadingPages/PrimaryLoaderPage';
import { NavLink, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <PrimaryLoaderPage/>
	}

	if (!user) {
		return <NavLink to={'/login'} state={location.pathname}/>
	}


	return children;
};

export default PrivateRoute;