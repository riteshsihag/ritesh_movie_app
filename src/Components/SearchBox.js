import React from 'react';
import './Header.css'

const SearchBox = (props) => {
	return (
		<div className="search">
		<input className='form-control' value={props.value} onChange={(event) =>props.setSearchValue(event.target.value)}
	 type="text" name="search" id="search" placeholder="Search movies here" />
	</div>
	);
};

export default SearchBox;
