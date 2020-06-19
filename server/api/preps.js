const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const moment = require("moment");


// ProgressUpdate model
const ProgressUpdate = require("../../models/ProgressUpdate");

const User = require("../../models/User.js");
const Prep = require("../../models/Prep.js");

//@route   GET api/preps/test
//@desc    Tests preps route
//@access  Public
router.get("/test", (req, res) => res.json("progressUpdates works"));

router.get("/urltest", (req, res) => res.json(getPhotoUrls('5c980b03602eba1d149749df', '07-16-2019', 3)));

//@route   GET api/preps/:user_id
//@desc    Get all preps by user_id
//@access  Private
router.get("/all/:client_id",passport.authenticate("jwt", {session: false}), (req, res) => {

	
	isAuthorized(req.params.client_id, req.user.id, () => {
		ProgressUpdate.find({client: req.params.client_id})
			.sort({date: -1})
			.then(progress => res.json(progress))
			.catch(err => res.status(404).json({noupdatesfound: "No progress updates found for that client."}));
	});
		
});



module.exports = router;