const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Load Input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");


const isAuthorized = require("../validation/is-authorized");

// Load user model
const TrainerProfile = require("../models/Profile");
const Client = require("../models/Client");
const User = require("../models/User");

//@route   GET api/users/test
//@desc    Tests users router
//@access  Public

router.get("/test", (req, res) => res.json("Users works"));

//@route   POST api/users/register
//@desc    Trainer Register
//@access  Public

router.post("/register", (req, res) => {

	const { errors, isValid } = validateRegisterInput(req.body);

	// Check validation
	//console.log(isValid);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email })
		.then(user => {
			if (user) {
				errors.email = "Email already exists"
				return res.status(400).json(errors);
			}
			else {
				const avatar = gravatar.url(req.body.email, {
					s: "200", // size
					rating: "pg", //rating
					d: "mm", //default
				})


				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					avatar: avatar,
					password: req.body.password,
					isTrainer: req.body.isTrainer,
					client_list: []
				});


				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser.save()
							.then(user => res.json(user))
							.catch(err => console.log(err));
					})
				})
			}
		})

});

//@route   POST api/users/client_register
//@desc    Client Register
//@access  Public

router.post("/client_register/:handle", (req, res) => {

	const { errors, isValid } = validateRegisterInput(req.body);

	// Check validation
	//console.log(isValid);
	if (!isValid) {
		return res.status(400).json(errors);
	}


	/////////////////////////////////////////////
	Client.findOne({ email: req.body.email })
		.then(client => {
			if (client) {
				errors.email = "Email already exists"
				return res.status(400).json(errors);
			}
			else {
				const avatar = gravatar.url(req.body.email, {
					s: "200", // size
					rating: "pg", //rating
					d: "mm", //default
				})
				const newClient = new Client({
					name: req.body.name,
					email: req.body.email,
					avatar: avatar,
					password: req.body.password,
					current_trainer: null
				});


				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newClient.password, salt, (err, hash) => {
						if (err) throw err;
						newClient.password = hash;
						newClient.save()
							.then(client => {
								TrainerProfile.findOne({ handle: req.params.handle })
									.populate("user", ["name", "avatar"])
									.then(trainer => {
										if (!trainer) {
											errors.email = "Trainer does not exist"
											return res.status(400).json(errors);
										}
										else {
											const trainerNewClient = {
												client: client._id,
												progress_update: []
											}
											User.findById(trainer.user.id)
												.then(user => {
													user.client_list.unshift(trainerNewClient);
													// user.client_list.unshift(client._id);
													user.save();
												});


											trainer.save();
											client.current_trainer = trainer.user._id;
											client.save();
										}
									})

								res.json(client)
							})
							.catch(err => console.log(err));
					})
				})
			}
		})
	/////////////////////////////////////////////////////

});



//@route   POST api/users/login
//@desc    Trainer Login User/ Returning token
//@access  Public

router.post("/login", (req, res) => {

	const { errors, isValid } = validateLoginInput(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	// Find user by email

	User.findOne({ email: req.body.email })
		.then(user => {


			if (!user) {
				errors.email = "User not found";
				return res.status(400).json({ email: "User not found" });
			}
			//Check password
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if (isMatch) {
						// User Matched

						const payload = { id: user.id, name: user.name, avatar: user.avatar, isTrainer: true }  //Create JWT payload

						//Sign token
						jwt.sign(
							payload,
							keys.secretOrKey,
							{ expiresIn: 3600 },
							(err, token) => {
								res.json({
									success: true,
									token: "Bearer " + token
								});
							});
					}
					else {
						errors.password = "Password incorrect";
						return res.status(400).json(errors);
					}
				});

		});

});


//@route   POST api/users/client_login
//@desc    Client login / Returning token
//@access  Public

router.post("/client_login/:trainer_id", (req, res) => {

	const { errors, isValid } = validateLoginInput(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	// Find Client by email
	Client.findOne({ email: req.body.email })
		.then(client => {
			if (!client) {
				errors.email = "client not found";
				return res.status(400).json({ email: "client not found" });
			}


			User.findById(req.params.trainer_id)
				.then(trainer => {
					if (trainer) {

						//console.log(trainer.clients.filter(trainersClient => trainersClient.client === client._id));

						if (trainer.client_list.filter(trainersClient => trainersClient.client === client._id)) {

							//Check password
							bcrypt.compare(password, client.password)
								.then(isMatch => {
									if (isMatch) {
										// client Matched

										const payload = { id: client.id, name: client.name, avatar: client.avatar, isTrainer: false, current_trainer: trainer._id }  //Create JWT payload

										//Sign token
										jwt.sign(
											payload,
											keys.secretOrKey,
											{ expiresIn: 3600 },
											(err, token) => {
												res.json({
													success: true,
													token: "Bearer " + token
												});
											});
									}
									else {
										errors.password = "Password incorrect";
										return res.status(400).json(errors);
									}
								});

						}
						else {
							errors.client = "You are not a client of this trainer.";
							return res.status(400).json(errors);
						}
					}
					else {
						return res.status(400).json({ trainer: "trainer does not exist" });
					}
				})




		})
		.catch(err => console.error(err));

});

//@route   Get api/users/clients
//@desc    Return all the trainers clients
//@access  Private

router.get("/clients", passport.authenticate("jwt", { session: false }), (req, res) => {
	const errors = {};



	if (req.user.isTrainer) {
		User.findById(req.user.id)
			.populate('client_list.client', ["name", "avatar"])
			.then(trainer => {

				if (!trainer.client_list) {
					errors.noclients = "There are no clients";
					return res.status(404).send(errors);
				}
				res.send(trainer.client_list)

			})
			.catch(err => console.error(err));
	}
});


//@route   POST api/users/macros/:client_id
//@desc    Sets clients current macros from trainer
//@access  Private

router.post("/macros/:client_id", passport.authenticate("jwt", { session: false }), (req, res) => {

	Client.findById(req.params.client_id)
		.then(client => {
			isAuthorized(req.params.client_id, req.user.id, () => {
				const newMacros = {
					fat: req.body.fat,
					protein: req.body.protein,
					carbs: req.body.carbs
				}

				client.macros = newMacros;
				client.save().then(client => res.json(client.macros));
			})

		})
		.catch(err => res.status(404).json({ noclient: "Client not found." }));


});

//@route   GET api/users/current
//@desc    Return current user
//@access  Private
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email,
		isTrainer: req.user.isTrainer,
		current_trainer: req.user.current_trainer
	});
});

module.exports = router;