import React from 'react';

const SearchBox = ({searchfield, searchChange}) =>{

	return(
			<div className="input-group mb-3">
				<div className='input-group-prepend'>
					<span className="input-group-text" id="basic-addon1">Search: </span>
				</div>

				<input value={searchfield} onChange={searchChange} type="text" className="form-control" placeholder="Enter Client Name..." aria-label="name" aria-describedby="basic-addon1"></input>
			</div>
		);
}

export default SearchBox;