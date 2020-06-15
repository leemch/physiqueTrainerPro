const Trainer = require("../models/User");



module.exports = function isTrainer(client_id, trainer_id) {
	let error = "";
	let isTrainer = false;

	//data.email = !isEmpty(data.email) ? data.email : "";
	//data.password = !isEmpty(data.password) ? data.password : "";

	Trainer.findById(trainer_id)
		.then(trainer => {
	
			if(trainer.client_list.filter(trainersClient => trainersClient.client == client_id).length > 0){
				isTrainer = true;
			}
			else{
				isTrainer =  false;
				error = "This is not a client of this trainer.";
			}
		})
		.catch(err => {
			isTrainer = false;
			error = "This trainer does not exist."
		});



	return{
		error,
		isTrainer
	}
}