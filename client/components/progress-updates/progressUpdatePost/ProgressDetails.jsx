import React, { Component } from 'react';



class ProgressDetails extends Component {
	render() {
		const { fat, protein, carbs, notes } = this.props;



		return (

			// <div className="row">


				<div className="mt-5">
					<h3 className="text-center text-info">Nutrition</h3>
					<div className="table-responsive">
						<table className="table table-striped table-lg table-bordered table-dark padding-4">
							<thead>
								<tr>
									<th>Macro</th>
									<th>Amount</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Protein</td>
									<td>{protein}g</td>
								</tr>
							</tbody>
							<tbody>
								<tr>
									<td>Fat</td>
									<td>{fat}g</td>
								</tr>
							</tbody>
							<tbody>
								<tr>
									<td>Carbohydrates</td>
									<td>{carbs}g</td>
								</tr>
							</tbody>
							<tbody>
								<tr>
									<td>Total Calories</td>
									<td>{(fat * 9) + (protein * 3) + (carbs * 3)} Calories</td>
								</tr>
							</tbody>

						</table>
					</div>

					{notes != "" ? (
					<div>
						<h3 className="text-center text-info">Notes</h3>
						<div className="table-responsive">
							<table className="table table-striped table-lg table-bordered table-dark padding-4">
								{notes}

							</table>
						</div>
					</div>
				)
					: null
				}

				</div>

			// </div>

		)
	}
}
export default ProgressDetails;