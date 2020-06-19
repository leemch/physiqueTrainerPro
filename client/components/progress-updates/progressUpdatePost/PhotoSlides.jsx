import React, { Component } from 'react';
import Spinner from "../../common/Spinner.jsx";



class PhotoSlides extends Component {


	render() {

		const { photos } = this.props;
		const firstImage = photos.shift();

		let imageInner = photos.map((photo, i) =>
			(
				<div className="carousel-item">
					<img src={photo} className="d-block w-100" alt="..." />
				</div>
			)
		);

		return (
			<div id="carouselExampleIndicators" className="carousel slide" data-interval="false">
				<div className="carousel-inner">
					<div className="carousel-item active">
						{/* <img src={firstImage} className="d-block w-100" alt="..." /> */}
						<img src={firstImage} className="img-fluid rounded img-responsive" alt="..." />
					</div>
					{imageInner}

				</div>

				<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="sr-only">Next</span>
				</a>
			</div>
		)
	}
}



export default PhotoSlides;