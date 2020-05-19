import React from 'react';
import Button from '../../styled/Button';

const Search = () => {
	const handler = (path) => {
		console.log(`${path} is where your going`);
	};
	return <Button onClick={() => handler('/search')}>Search</Button>;
};

export default Search;
