import React from 'react';
import Card from './Card';

const CardList = ({clients}) => {
	

	return(
	<div>
		{
		clients.map((user, i) => {
		return (
			<Card 
			key={i} 
			id={clients[i].client._id} 
			name={clients[i].client.name} 
			avatar={clients[i].client.avatar} 
			/>
			
		);
	})
	}
		
	</div>
	);
}

export default CardList;