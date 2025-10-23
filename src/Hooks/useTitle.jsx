import React, { useEffect } from 'react';

const useTitle = (title) => {

	useEffect(() => {
		document.title = `TechOrbit || ${title}`
	},[title])


};

export default useTitle;