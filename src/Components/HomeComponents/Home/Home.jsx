import React from 'react';
import ForbiddenPage from '../../ForbiddenPage/ForbiddenPage';
import BannerCarousel from '../Banner/BannerCarousel ';
import CategoriesSection from '../CategoriesSection/CategoriesSection';
import LatestBlogsSection from '../LatestBlogsSection/LatestBlogsSection';
import SubscribeSection from '../SubscribeSection/SubscribeSection';
import JoinAsMaker from '../JoinAsMaker/JoinAsMaker';
import TipsInsights from '../TipsInsights/TipsInsights';
import AppDownload from '../AppDownload/AppDownload';


const Home = () => {
	return (
		<div>
			<BannerCarousel />
			<CategoriesSection/>
			<LatestBlogsSection />
			<JoinAsMaker />
			<TipsInsights />
			<AppDownload/>
			<SubscribeSection/>
		</div>
	);
};

export default Home;