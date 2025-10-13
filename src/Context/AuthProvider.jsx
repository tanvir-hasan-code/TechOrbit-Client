import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Auth/Authentication/Key/firebase.init';
import PrimaryLoaderPage from '../LoadingPages/PrimaryLoaderPage';


const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const provider = new GoogleAuthProvider();

	const GoogleSignIn = () => {
		return signInWithPopup(auth, provider);
	}
	
	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password)
	};

	const signInUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password)
	};

	const updateUserProfile = (userInfo) => {
		return updateProfile(auth.currentUser, userInfo);
	}

	const logOut = () => {
		return signOut(auth);
	}


	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		})
		return () => {
			unSubscribe()
		}
	},[])

	const authInfo = {
		user,
		createUser,
		signInUser,
		GoogleSignIn,
		logOut,
		updateUserProfile,
		loading,

	}

	if (loading) {
		return <PrimaryLoaderPage/>
	}


	return (
		<AuthContext  value={authInfo}>
			{children}
		</AuthContext>
	);
};

export default AuthProvider;