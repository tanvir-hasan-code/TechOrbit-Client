import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
	return (
		<div>
			<Navbar/>
			<div className='pt-14'>
				<Outlet/>
			</div>
			<Footer/>
		</div>
	);
};

export default RootLayout;