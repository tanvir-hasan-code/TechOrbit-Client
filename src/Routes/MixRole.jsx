import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import PrimaryLoaderPage from '../LoadingPages/PrimaryLoaderPage';
import { Navigate } from 'react-router';

const MixRole = ({children}) => {

	const { user, loading } = useAuth();
	const { role, isLoading } = useUserRole()
	
	if (loading || isLoading) {
		return <PrimaryLoaderPage/>
	}

	if ( !user ||  !["admin", "moderator"].includes(role)) {
		return <Navigate to={"/forbidden"} />
	}

	return children;
};

export default MixRole;