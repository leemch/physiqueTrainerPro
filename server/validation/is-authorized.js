const Trainer = require("../models/User");



module.exports = function isAuthorized(client_id, trainer_id, cb) {
	//let error = "";
	//let isAuth = false;


	if(client_id.toString() == trainer_id.toString()){
		return cb();
	}
	else {
		Trainer.findById(trainer_id)
		.then(trainer => {
	
			if(trainer.client_list.filter(trainersClient => trainersClient.client == client_id.toString()).length > 0){
				console.log("Is Authorized.");
				return cb();
			}
			else{

				console.log("Not your client");
				return false;
			}
		})
		.catch(err => {
			console.log("error");
			return false;
		});
	}
	return false;

	

}