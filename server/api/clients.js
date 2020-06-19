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

// Load client model
const Client = require("../models/Client");
const Trainer = require("../models/User");

//@route   GET api/clients/test
//@desc    Tests clients router
//@access  Public

router.get("/test", (req, res) => res.json("Clients works"));





//@route   GET api/clients/macros
//@desc    Gets current macros from client by ID.
//@access  Private


router.get("/macros/:client_id", passport.authenticate("jwt", {session: false}), (req, res) => {

	Client.findById(req.params.client_id)
	.then(client => {
		isAuthorized(req.params.client_id, req.user.id, () => {
			const macros = {
				fat: client.macros.fat ? client.macros.fat : 0,
				protein: client.macros.protein ? client.macros.protein : 0,
				carbs: client.macros.carbs ? client.macros.carbs : 0
			}
			
			res.json(macros);
		})

	})
	.catch(err => res.status(404).json({noclient: "Client not found."}));

});




module.exports = router;