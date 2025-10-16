import React from 'react';
import ForbiddenPage from '../../ForbiddenPage/ForbiddenPage';
import BannerCarousel from '../Banner/BannerCarousel ';
import CategoriesSection from '../CategoriesSection/CategoriesSection';
import LatestBlogsSection from '../LatestBlogsSection/LatestBlogsSection';
import SubscribeSection from '../SubscribeSection/SubscribeSection';
import JoinAsMaker from '../JoinAsMaker/JoinAsMaker';
import TipsInsights from '../TipsInsights/TipsInsights';


const Home = () => {
	return (
		<div>
			<BannerCarousel />
			<CategoriesSection/>
			<LatestBlogsSection />
			<JoinAsMaker />
			<TipsInsights/>
			<SubscribeSection/>
		</div>
	);
};

export default Home;