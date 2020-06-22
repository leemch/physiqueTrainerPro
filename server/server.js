const express = require("express");
const path = require('path');
const passport = require("passport");
const mongoose = require("mongoose");

const server = express();

//API Routes
const users = require("./api/users");
const posts = require("./api/posts");
const profile = require("./api/profile");
const progressUpdates = require("./api/progress_updates");
const imageUpload = require("./api/image-upload");
const clients = require("./api/clients");

// DB config
const db = require("./config/keys").mongoURI;

// Passport middleware
server.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../dist')));

// Connect to MongoDB
mongoose
.connect(db, { 
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));



//Use Routes
server.use("/api/users", users);
server.use("/api/profile", profile);
server.use("/api/posts", posts);
server.use("/api/clients", clients);
server.use("/api/progress_updates", progressUpdates);
server.use("/api/image-upload", imageUpload);

server.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
})

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on port ${port}`));