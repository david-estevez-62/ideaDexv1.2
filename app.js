var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var _ = require('underscore');
var mongoose = require('mongoose');
var shortid = require('shortid');
var path = require('path');
var fs = require('fs');
var multer = require('multer');
var morgan = require('morgan');
var util = require("util");


var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var passportConfig = require('./config/passport');
var User = require('./models/users.js');

var indexController = require('./controllers/index.js');
var adminController = require('./controllers/admin');
var editController = require('./controllers/edit')
var homeController = require('./controllers/home')
var usersController = require('./controllers/users');
var searchController = require('./controllers/search')
var signupController = require('./controllers/createfile')
var postController = require('./controllers/post');
var uploadsController = require('./controllers/uploads.js');


mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/ideanote');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();



app.set('view engine', 'jade');
app.set('views', __dirname + '/views/');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use("/bower_components", express.static(__dirname + '/bower_components'));


// app.use(express.bodyParser({uploadDir:'./uploads'}));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));


app.use(cookieParser());
app.use(flash());

app.use(passport.initialize());

app.use(passport.session());
app.use(multer({
    dest: "./public/uploads/"
}));





// Our get request for viewing the login page
app.get('/login', adminController.login);

// Post received from submitting the login form
app.post('/login', adminController.processLogin);

// Post received from submitting the signup form
app.post('/signup', adminController.processSignup);

// Any requests to log out can be handled at this url
app.get('/logout', adminController.logout);





app.get('/', indexController.index);
app.get('/createacct', signupController.index);




// ***** IMPORTANT ***** //
// By including this middleware (defined in our config/passport.js module.exports),
// We can prevent unauthorized access to any route handler defined after this call
// to .use()  [// app.use(passportConfig.ensureAuthenticated);]

app.use(passportConfig.isLoggedIn);





app.get('/:username/home', homeController.index);
app.post('/ideaPosted', usersController.PostIdea);
app.post('/ideaRemoved', usersController.RemovePost);
app.post('/upvote', postController.Upvote);
app.post('/downvote', postController.Downvote);
app.post('/favorite', usersController.Favorite);
app.get('/:username/favorites', usersController.Favorites)
app.get('/:username/edit', editController.index);
app.get('/:username/search', searchController.index);
app.post('/:username/search', usersController.Search);
app.get('/:username/discover', usersController.Discover);
app.get('/:username/notifications', usersController.Notifications);
app.get('/:username/changeUsername', usersController.ChangeUsername);
app.post('/changeUsername', usersController.ChngUsername);
app.get('/:username/changePassword', usersController.ChangePassword);
app.post('/changePassword', usersController.ChngPassword);
app.get('/:username/:usersprof', usersController.ViewProfile);
app.post('/follow', usersController.FollowUser);
app.post('/changeProfpic', usersController.ChangePic);
app.post('/uploadProfilepic', usersController.UploadPic);




// Use heroku's port if it is specified.
// Otherwise use our own local port.
// var port = process.env.PORT || 6591;
// var server = app.listen(port, function(){})
var server = app.listen(process.env.PORT || 6591, function () {
  console.log('Express server listening on port ' + server.address().port);
});
