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
		return res.status(400).send(errors);
	}

	User.findOne({ email: req.body.email })
		.then(user => {
			if (user) {
				errors.email = "Email already exists"
				return res.status(400).send(errors);
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
							.then(user => res.send(user))
							.catch(err => console.log(err));
					})
				})
			}
		})

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
				return res.status(400).send({ email: "User not found" });
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
						return res.status(400).send(errors);
					}
				});

		});

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
					return res.status(404).json(errors);
				}
				res.json(trainer.client_list)

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


module.exports = router;