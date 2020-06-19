const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load profile Model
const Profile = require("../models/Profile");

// Load user profile
const User = require("../models/User");

// Load Validation
const validateProfileInput = require("../validation/Profile");
const validateExpInput = require("../validation/experience");
const validateEduInput = require("../validation/education");


//@route   GET api/profile/test
//@desc    Tests profile route
//@access  Public
router.get("/test", (req, res) => res.json("Profile works"));


//@route   GET api/profile
//@desc    Get current users profile
//@access  Private
router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
	const errors = {};
	Profile.findOne({user: req.user.id})
	.populate("user", ["name", "avatar"])
	.then(profile => {
		if(!profile){
			errors.noprofile = "There is no profile for this user";
			return res.status(404).json(errors);
		}

		res.json(profile);
	})
	.catch(err => res.status(404).json(err));
});

//@route   Get api/profile/all
//@desc    get all profiles
//@access  Public

router.get("/all", (req, res) =>{
	const errors = {};

	Profile.find()
	.populate("user", ["name", "avatar"])
	.then(profiles => {
		if(!profiles){
			errors.noprofiles = "There are no profiles";
			return res.status(404).json(errors);
		}

		res.json(profiles);
	})
	.catch(err => res.status(404).json({profile: "There are no profiles"}));
});

//@route   Get api/profile/handle/:handle
//@desc    get profile by handle
//@access  Public

router.get("/handle/:handle", (req, res) =>{
	const errors = {};

	Profile.findOne({handle: req.params.handle})
	.populate("user", ["name", "avatar"])
	.then(profile =>{
		if(!profile){
			errors.noprofile = 'There is no profile found for this user';
			res.status(404).json(errors);
		}

		res.json(profile);
	})
	.catch(err => res.status(400).json(err));
});

//@route   Get api/profile/user/:user_id
//@desc    get profile by user ID
//@access  Public

router.get("/user/:user_id", (req, res) =>{
	const errors = {};

	Profile.findOne({user: req.params.user_id})
	.populate("user", ["name", "avatar"])
	.then(profile =>{
		if(!profile){
			errors.noprofile = 'There is no profile found for this user';
			res.status(404).json(errors);
		}

		res.json(profile);
	})
	.catch(err => res.status(400).json({profile: "There is no profile for this user"}));
});


//@route   POST api/profile
//@desc    Create or edit user profile
//@access  Private
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {

	const {errors, isValid} = validateProfileInput(req.body);

	// Check validation
	if(!isValid){
		// Return any errors
		return res.status(400).json(errors);
	}

	//Get fields
	const profileFields = {};

	profileFields.user = req.user.id;
	if(req.body.handle) profileFields.handle = req.body.handle; else profileFields.handle = "";
	if(req.body.company) profileFields.company = req.body.company; else profileFields.company = "";
	if(req.body.website) profileFields.website = req.body.website; else profileFields.website = "";
	if(req.body.location) profileFields.location = req.body.location; else profileFields.location = "";
	if(req.body.bio) profileFields.bio = req.body.bio; else profileFields.bio = "";

	// Services - Split into array
	if(typeof req.body.services !== "undefined") {
		profileFields.services = req.body.services.split(",");
	}

	// Social
	profileFields.social = {};
	if(req.body.youtube) profileFields.social.youtube = req.body.youtube; else profileFields.social.youtube = "";
	if(req.body.twitter) profileFields.social.twitter = req.body.twitter; else profileFields.social.twitter = "";
	if(req.body.facebook) profileFields.social.facebook = req.body.facebook; else profileFields.social.facebook = "";
	if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin; else profileFields.social.linkedin = "";
	if(req.body.instagram) profileFields.social.instagram = req.body.instagram; else profileFields.social.instagram = "";

	Profile.findOne({user: req.user.id})
	.then(profile => {
		if(profile){
			// Update
			Profile.findOneAndUpdate(
				{user: req.user.id}, 
				{$set: profileFields}, 
				{new: true}
				).then(profile => res.json(profile));
		}
		else{
			//Create New

			// Check if handle exists
			Profile.findOne({handle: profileFields.handle})
			.then(profile => {
				if(profile){
					errors.handle = "That handle already exists";
					res.status(400).json(errors);
				}

				// Save Profile
				new Profile(profileFields).save().then(profile => res.json(profile));
			});

		}
	})



});

//@route   POST api/profile/experience
//@desc    Add experience to profile
//@access  Private
router.post("/experience", passport.authenticate("jwt", {session: false}), (req, res) => {

	const {errors, isValid} = validateExpInput(req.body);

	// Check validation
	if(!isValid){
		// Return any errors
		return res.status(400).json(errors);
	}

	Profile.findOne({user: req.user.id})
	.then(profile =>{
		const newExp = {
			title: req.body.title,
			company: req.body.company,
			location: req.body.location,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description
		}

		// Add to exp array
		profile.experience.unshift(newExp);
		profile.save().then(profile => res.json(profile));
	})
});


//@route   POST api/profile/education
//@desc    Add education to profile
//@access  Private
router.post("/education", passport.authenticate("jwt", {session: false}), (req, res) => {

	const {errors, isValid} = validateEduInput(req.body);

	// Check validation
	if(!isValid){
		// Return any errors
		return res.status(400).json(errors);
	}

	Profile.findOne({user: req.user.id})
	.then(profile =>{
		const newEdu = {
			school: req.body.school,
			degree: req.body.degree,
			fieldofstudy: req.body.fieldofstudy,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description
		}

		// Add to exp array
		profile.education.unshift(newEdu);
		profile.save().then(profile => res.json(profile));
	})
});

//@route   DELETE api/profile/experience/:exp_id
//@desc    Delete experience from profile
//@access  Private
router.delete("/experience/:exp_id", passport.authenticate("jwt", {session: false}), (req, res) => {


	Profile.findOne({user: req.user.id})
	.then(profile =>{
		// Get remove index
		const removeIndex = profile.experience
		.map(item => item.id)
		.indexOf(req.params.exp_id);

		//Splice out of array
		profile.experience.splice(removeIndex, 1);

		//Save
		profile.save().then(profile => res.json(profile));

	})
	.catch(err => res.status(404).json(err));
});


//@route   DELETE api/profile/education/:edu_id
//@desc    Delete education from profile
//@access  Private
router.delete("/education/:edu_id", passport.authenticate("jwt", {session: false}), (req, res) => {


	Profile.findOne({user: req.user.id})
	.then(profile =>{
		// Get remove index
		const removeIndex = profile.education
		.map(item => item.id)
		.indexOf(req.params.edu_id);

		//Splice out of array
		profile.education.splice(removeIndex, 1);

		//Save
		profile.save().then(profile => res.json(profile));

	})
	.catch(err => res.status(404).json(err));
});


//@route   DELETE api/profile
//@desc    Delete user and profile
//@access  Private
router.delete("/", passport.authenticate("jwt", {session: false}), (req, res) => {


	Profile.findOneAndRemove({user: req.user.id})
	.then(() => {
		User.findOneAndRemove({_id: req.user.id})
		.then(() => res.json({success: true}));
	});
});


module.exports = router;