const express = require('express');
const router = express.Router();
const passport = require("passport");

const { upload, uploadProfilePicture } = require("../services/image-upload");
const config = require("../config/keys");
const AWS = require('aws-sdk');
const singleUpload = upload.single('image');
const multipleUpload = upload.array('image', 10);
const User = require("../models/User");

router.post('/profile', passport.authenticate("jwt", { session: false }), (req, res) => {

    if (req.user.isTrainer) {

        uploadProfilePicture.single('image')(req, res, err => {
            if (err) {
                return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
            }
            User.findByIdAndUpdate(req.user.id, { avatar: req.file.location }).then(result => {
                return res.send({ 'url': req.file.location });
            })
        });
    }
});


router.post('/upload-multiple', passport.authenticate("jwt", { session: false }), (req, res) => {
    multipleUpload(req, res, err => {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
        }
        return res.send({ 'imageUpload': req.files });
    });
});



module.exports = router;