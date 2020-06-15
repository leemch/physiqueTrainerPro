import React from 'react';
import spinner from "./spinner.gif";

const Spinner = () => {



	return(
		<div>
			<img src={spinner} style={{width: "200px", margin: 'auto', diplay: "block"}} alt="Loading..." />
		</div>

	);



};
export default Spinner;