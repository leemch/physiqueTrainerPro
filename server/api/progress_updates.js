const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const moment = require("moment");


// ProgressUpdate model
const ProgressUpdate = require("../../models/ProgressUpdate");

const Trainer = require("../../models/User");

// Profile model
const Profile = require("../../models/Profile");

//Validation
const validatePostInput = require("../../validation/post");
const isTrainer = require("../../validation/is-trainer");
const isAuthorized = require("../../validation/is-authorized");

const {upload} = require("../../services/image-upload");

const singleUpload = upload.single('image');
const multipleUpload = upload.array('image',10);


const config = require("../../config/keys");
const AWS = require('aws-sdk');
const cloudFront = new AWS.CloudFront.Signer(config.CF_ACCESS_KEY, config.RSA_PRIVATE_KEY);


//@route   GET api/progress_updates/test
//@desc    Tests progressUpdate route
//@access  Public
router.get("/test", (req, res) => res.json("progressUpdates works"));

router.get("/urltest", (req, res) => res.json(getPhotoUrls('5c980b03602eba1d149749df', '07-16-2019', 3)));

//@route   GET api/progress_updates/:client_id
//@desc    Get all progress updates by client_id
//@access  Private
router.get("/all/:client_id",passport.authenticate("jwt", {session: false}), (req, res) => {

	
	isAuthorized(req.params.client_id, req.user.id, () => {
		ProgressUpdate.find({client: req.params.client_id})
			.sort({date: -1})
			.then(progress => res.json(progress))
			.catch(err => res.status(404).json({noupdatesfound: "No progress updates found for that client."}));
	});
		
});


//@route   GET api/progress_updates/:id
//@desc    Get progress update by id
//@access  Private
router.get("/:id",passport.authenticate("jwt", {session: false}), (req, res) => {

	

	ProgressUpdate.findById(req.params.id)
		.then(progress => {
			isAuthorized(progress.client, req.user.id, () => {
				res.json(progress);
			});	
		})
		.catch(err => res.status(404).json({noupdatesfound: "No progress update found for that client."}));
});




//@route   POST api/progress_updates
//@desc    Create a progress update
//@access  Private
router.post("/", passport.authenticate("jwt", {session: false}), (req,res) => {
	//const {errors, isValid} = validatePostInput(req.body);
	//console.log(req.body);
	//Check validation
	//if(!isValid){
		//If any errors, send 400 with errors object
	//	return res.status(400).json(errors);
	//}

	if(req.user.isTrainer) {
		return res.status(400).json({notClient: "You cant post progress updates."});
	}

	multipleUpload(req, res, err => {
        if(err){
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
		}

		const currentDate = moment().startOf('day');
		console.log(currentDate);
		
		ProgressUpdate.findOne({client: req.user.id, 
			date: {
				"$gte": currentDate
			}
		})
		.then(update => {
			if(update){
				return res.status(400).json({exists: "Progress update was already posted today."});
			}
			else{
				const newProgressUpdate = new ProgressUpdate({
					client: req.user.id,
					weight: req.body.weight,
					macros: {
						fat: req.body.fat,
						protein: req.body.protein,
						carbs: req.body.carbs
					},
					notes: req.body.notes,
					photos: req.body.photos
		
				});
			
				newProgressUpdate.save()
				.then(progress => res.json(progress));
			}
		})
		.catch(err => res.status(404).json({noupdatesfound: "No progress updates found for that client."}))


	

    });

	


			
});


const getPhotoUrls = (client_id, date, numPhotos) => {

	let urls = [];

	for(let x = 0; x < numPhotos; x++){
		// Generating a signed URL
		cloudFront.getSignedUrl({
			url: 'http://d12w44ud3mpa5f.cloudfront.net/' + 'client-photos' + '/' + client_id + '/' + date + '/' + x + ".jpg",
			expires: Math.floor((new Date()).getTime() / 1000) + (5) // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
		}, (err, url) => {
			if (err) throw err;
			urls.push(url);
		});
	}
	return urls;
}

//Get signed urls to photos
// Private
router.get('/photos/:client_id/:date/:num_photos',passport.authenticate("jwt", {session: false}), (req, res) => {

	if(req.user.isTrainer){
		Trainer.findById(req.user.id)
		.then(trainer => {
	
			if(trainer.client_list.filter(trainersClient => trainersClient.client == req.params.client_id).length > 0){
				res.json(getPhotoUrls(req.params.client_id, req.params.date, req.params.num_photos));
			}
			else{
				return res.status(404).json({notclient: "This is not your client."});
			}
		})
		.catch(err => res.status(404).json({notrainer: "Trainer not found"}));
	} else {
		if(req.user.id === req.params.client_id){
			res.json(getPhotoUrls(req.params.client_id, req.params.date, req.params.num_photos));
		}
		else{
			return res.status(404).json({notclient: "These are not your updates"});
		}
	}

	
	//res.json(getPhotoUrls(req.params.client_id, req.params.date, req.params.numPhotos));
});


//@route   POST api/progress_updates/comment/:id
//@desc    Add comment to progress update
//@access  Private
router.post("/comment/:id", passport.authenticate("jwt", {session: false}), (req, res) => {

	const {errors, isValid} = validatePostInput(req.body);
	
		//Check validation
		if(!isValid){
			//If any errors, send 400 with errors object
			return res.status(400).json(errors);
		}

		ProgressUpdate.findById(req.params.id)
		.then(pu => {

			// if(isAuthorized(req.params.client_id, req.user.id)){
			// 	ProgressUpdate.find({client: req.params.client_id})
			// 		.sort({date: -1})
			// 		.then(progress => res.json(progress))
			// 		.catch(err => res.status(404).json({noupdatesfound: "No progress updates found for that client."}));
			// }


			if(req.user.isTrainer){

				if(isTrainer(pu.client, req.user.id)) {

						const newComment = {
							text: req.body.text,
							name: req.body.name,
							avatar: req.body.avatar,
							user: req.user.id
						}
				
						// Add to comments array
						pu.comments.unshift(newComment);
						pu.save().then(pu => res.json(pu))					
				}
	
			}

			else {

					const newComment = {
						text: req.body.text,
						name: req.body.name,
						avatar: req.body.avatar,
						user: req.user.id
					}
			
					// Add to comments array
					pu.comments.unshift(newComment);
					pu.save().then(pu => res.json(pu))

			}
		})
		.catch(err => res.status(404).json({postnotfound: "No post found"}));

	});
	
	
	//@route   DELETE api/progress_updates/comment/:id/:comment_id
	//@desc    Remove comment from progress update
	//@access  Private
	router.delete("/comment/:id/:comment_id", passport.authenticate("jwt", {session: false}), (req, res) => {
	
	const {errors, isValid} = validatePostInput(req.body);



	ProgressUpdate.findById(req.params.id)
		.then(pu => {

			// Check to see if it exists
			if(pu.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
				return res.status(404).json({commentnotexists: "comment does not exists"});
			}
	
			//Get remove index
			const removeIndex = pu.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

			if(req.user.id == pu.comments[removeIndex].user){
				// Splice comment from array
				pu.comments.splice(removeIndex, 1);
				pu.save().then(pu => res.json(pu));
			}
			else{
				return res.status(404).json({notauthorized: "you cannot delete this comment."});
			}
			
		})
		.catch(err => res.status(404).json({postnotfound: "No post found"}));
	
	});

  



module.exports = router;