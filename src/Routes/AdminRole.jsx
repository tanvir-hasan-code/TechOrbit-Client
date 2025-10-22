import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import PrimaryLoaderPage from '../LoadingPages/PrimaryLoaderPage';
import { Navigate } from 'react-router';

const AdminRole = ({children}) => {
	const { user, loading } = useAuth();
	const { role, isLoading } = useUserRole();

	if (loading || isLoading) {
		return <PrimaryLoaderPage/>
	}

	if (!user || role !== "admin") {
		return <Navigate to={"/forbidden403"}/>
	}

	return children;
};

export default AdminRole;