import React from 'react';
import BannerCarousel from '../Banner/BannerCarousel ';
import CategoriesSection from '../CategoriesSection/CategoriesSection';
import LatestBlogsSection from '../LatestBlogsSection/LatestBlogsSection';
import SubscribeSection from '../SubscribeSection/SubscribeSection';
import JoinAsMaker from '../JoinAsMaker/JoinAsMaker';
import TipsInsights from '../TipsInsights/TipsInsights';
import AppDownload from '../AppDownload/AppDownload';
import CouponSlider from '../CouponSlider/CouponSlider';
import useTitle from '../../../Hooks/useTitle';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import TrendingProducts from '../TrendingProducts/TrendingProducts';


const Home = () => {
	useTitle("Home")
	return (
		<div>
			<BannerCarousel />
			<FeaturedProducts/>
			<TrendingProducts/>
			<CategoriesSection/>
			<LatestBlogsSection />
			<JoinAsMaker />
			<TipsInsights />
			<CouponSlider/>
			<AppDownload />
			<SubscribeSection/>
		</div>
	);
};

export default Home;