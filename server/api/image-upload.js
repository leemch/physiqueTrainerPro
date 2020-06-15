const express = require('express');
const router = express.Router();
const passport = require("passport");

const {upload} = require("../../services/image-upload");
const config = require("../../config/keys");
const AWS = require('aws-sdk');
const singleUpload = upload.single('image');
const multipleUpload = upload.array('image', 10);

router.post('/',passport.authenticate("jwt", {session: false}), (req, res) => {
    singleUpload(req, res, err => {
        if(err){
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }
        //res.header("Access-Control-Allow-Origin", "*");
        return res.json({'imageUrl': req.file.location});
    });
});


router.post('/upload-multiple',passport.authenticate("jwt", {session: false}), (req, res) => {

    

    multipleUpload(req, res, err => {
        if(err){
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }
        return res.json({'imageUpload': req.files});
    });
});



module.exports = router;