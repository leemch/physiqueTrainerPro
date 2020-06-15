import React from 'react';

const Card = ({name, avatar, id}) => {

	return(

		<div className="card" style={{width: '18rem'}}>
			<img src={avatar} className="card-img-top" alt="..."></img>
			<div className="card-body">
    			<h5 className="card-title">{name}</h5>
    			<a href="#" className="btn btn-primary">Manage</a>
  			</div>
		</div>


		);


}


export default Card;