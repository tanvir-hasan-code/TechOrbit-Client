import React from 'react';
import ForbiddenPage from '../../ForbiddenPage/ForbiddenPage';
import BannerCarousel from '../Banner/BannerCarousel ';
import CategoriesSection from '../CategoriesSection/CategoriesSection';
import LatestBlogsSection from '../LatestBlogsSection/LatestBlogsSection';
import SubscribeSection from '../SubscribeSection/SubscribeSection';


const Home = () => {
	return (
		<div>
			<BannerCarousel />
			<CategoriesSection/>
			<LatestBlogsSection />
			<SubscribeSection/>
		</div>
	);
};

export default Home;