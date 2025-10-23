import React from 'react';
import useUserRole from '../../Hooks/useUserRole';
import AdminDashboard from '../DashboardUserHome/AdminDashboard';
import PrimaryLoaderPage from '../../LoadingPages/PrimaryLoaderPage';
import ModeratorDashboard from '../DashboardUserHome/ModeratorDashboard';
import UserDashboard from '../DashboardUserHome/UserDashboard';
import useTitle from '../../Hooks/useTitle';

const DashboardHome = () => {
	useTitle("Dashboard")
	const { role, isLoading } = useUserRole();

	if (isLoading) {
		return <PrimaryLoaderPage/>
	}

	if (role === "admin") {
		return <AdminDashboard/>
	} else if (role === "moderator") {
		return <ModeratorDashboard/>
	}else{
		return <UserDashboard/>
	}
};

export default DashboardHome;