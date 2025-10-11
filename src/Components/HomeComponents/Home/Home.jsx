import React from 'react';
import MagicButton from '../../../Shared/Buttons/MagicButton';
import GoogleLogin from '../../../Auth/Authentication/Pages/SocialLogin/GoogleLogin';

const Home = () => {
	return (
		<div>
			<h1>Hello From Home</h1>
			<GoogleLogin></GoogleLogin>
		</div>
	);
};

export default Home;