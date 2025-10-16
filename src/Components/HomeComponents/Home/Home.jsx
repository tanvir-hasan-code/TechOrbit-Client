import React from 'react';
import ForbiddenPage from '../../ForbiddenPage/ForbiddenPage';
import BannerCarousel from '../Banner/BannerCarousel ';
import CategoriesSection from '../CategoriesSection/CategoriesSection';


const Home = () => {
	return (
		<div>
			<BannerCarousel />
			<CategoriesSection/>
		</div>
	);
};

export default Home;