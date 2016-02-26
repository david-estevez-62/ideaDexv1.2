var User = require('../models/users.js');
var _ = require('underscore');
var shortid = require('shortid');
var fs = require('fs')
// var myid = 0;




var usersController = {

  Search: function (req, res) {

  User.find({username: new RegExp(req.body.search, 'i')}, function (err, user) {

    if (err) return handleErr(err);


        var matches =_.filter(user, function(obj){
          return obj.username !== req.params.username;
        });

      res.render('search', {userlist: matches, user: req.user});

    });

},

  Discover: function (req, res) {
  var posts = req.user.discover.reverse();
    res.render('discover', {
      user: req.user,
      posts: posts
    });
},

Favorites: function (req, res) {

    var favorites = req.user.favorites.reverse();

      res.render('favorites', {
        user: req.user,
        favorites: favorites
      });

},

PostIdea: function (req, res) {

    var data = req.body;
    var id = req.user._id;
    var username = req.user.username;
    var date = Date();
    var onOff = false;
    if (req.body.onoffswitch) {
      onOff = true;
    }
    // myid += 1;
    // console.log(myid);

    // console.log('this is req.body in guestUpdateInfo: ', req.user);
    User.findById(id, function(err, user) {
      if (err) return handleErr(err);

      var uid = shortid.generate();



      newPost = {
        contents: [data.contents || '/uploads/'+req.files.fileInput.name],
        _id: uid,
        privacy: onOff,
        username: req.user.username,
        date: date,
        rating: Number(0),
        uwv: []
      };

      user.posts.push(newPost);

      user.save(function(err, user){
        if(err) return handleErr(err);
        if(newPost.privacy === false){
          for (var i = 0; i < user.followers.length; i++) {
            User.findOne({username:user.followers[i]}, function(err, follower){
              follower.discover.push(newPost)
              follower.save();
            });
          }
        }
      });
    });
    

  // Upload images to uploads folder
    if (!req.files.fileInput || !req.files.fileInput.size) {
      console.log('do nothing')
      }
    else{
      console.log(util.inspect(req.files));
      if (req.files.fileInput.size === 0) {
                  return next(new Error("Hey, first would you select a file?"));
      }
      fs.exists(req.files.fileInput.path, function(exists) {
        if(!exists) {
          res.end("Well, there is no magic for those who don’t believe in it!");
        }
      });
    }
    res.redirect("/"+username+"/home");

},

  Notifications: function (req, res) {

  User.find({username: req.user.username}, function (err, data) {
    if (err) {
      res.send(err);
    }

      var counter = data[0].notifications.length;

      var notifications = data[0].notifications.reverse();


      // data[0].notifications.remove({})
      // User.update({"username":"req.user.username"}, {"$unset":{"notifications":{}}})
      User.update({"username":"req.user.username"}, {"$unset":{"notifications":{}}})
      // data[0].save()
      console.log(data[0].notifications.length);



      res.render('notifications', {
        user: req.user,
        // notifications will include followers and favorited posts
        notifications:notifications
      });


  });



},

  ChangeUsername: function (req, res) {
  res.render('changeUsername', {user: req.user});
},

  ChangePassword: function (req, res) {
    res.render('changePassword', {user: req.user});
  },


  ChngPassword: function (req, res) {
    var data = req.body;
    var id = req.user._id;
    var username = req.user.username;

    User.findById(id, function(err, user) {
      if (err) return handleErr(err);
      user.password = data.password || user.password;
      user.incomplete = false;
      user.save(function(err, user) {
        if(err) return handleErr(err);

        res.send(user);
      });

    });
  },

  ChngUsername: function (req, res) {
    var data = req.body;
    var id = req.user._id;
    var username = req.user.username;


    User.findById(id, function(err, user) {
      if (err) return handleErr(err);
      console.log(user);
      user.username = data.username || user.username;
      user.save(function(err, user) {
        if(err) return handleErr(err);

        res.send(user);
      });
    });
  },

  FollowUser: function(req,res){
    var data = req.body;
    var id = req.user._id;
    var username = req.user.username;

      User.findById(id, function (err, user) {
      if (err) return handleErr(err);

    user.following.push(data.usersProf);

        user.save();

    });

    User.findOne({username:data.usersProf}, function (err, user) {
      if (err) return handleErr(err);

    user.followers.push(username);
    user.notifications.push(username + ' followed your account');


      // console.log(data.usersProf);

        user.save();
        res.send(user.notifications);
        // res.redirect('/user/' + username + '/' + data.usersProf);

    });

  },
  // ,
  // PushPublic: function(req,res){
  //  var data = req.body;
  //  var username = req.user.username;

  //  User.find({followers: username}, function(err, user) {
  //    user.followers.push()
  //  });

  // }
  Favorite: function(req, res){
      var id = req.user._id;
      var thisUser = req.user.username;
      var username =req.body.userPosted;
      var postid = req.body.thisPost;
      var contents = req.body.postContent;

     favorite = {
      thisUser:thisUser,
      contents: contents,
      _id: postid,
      username: username
     };


     User.findOne({username:username}, function(err, user){
      if (err) return handleErr(err);

      user.notifications.push(thisUser + " favorites this idea: " + contents);
      user.save();
      res.send(user.notifications);
     });


     User.findById(id, function(err, user){
      if (err) return handleErr(err);


      var favorites = user.favorites;

      var alrdyFavorited =_.filter(favorites, function(obj){

              return obj._id === postid;
          });


      if(alrdyFavorited.length === 1){
        console.log('do nothing');
      }else{
        user.favorites.push(favorite);
      }


      user.save();

     });


  },
  // Notifications: function(req, res){
  //  console.log('hi');
  // },


  RemovePost: function(req, res){
    var postid = req.body.thisPost;
    var id = req.user._id;
    var username = req.user.username;

    User.findById(id, function(err, user) {
      if (err) return handleErr(err);

      for (var i = 0; i < user.posts.length; i++) {

        if(user.posts[i]._id=== postid){

          user.posts.splice(i, 1);

          user.save();
        }
      }


      user.save(function(err, user){
        if(err) return handleErr(err);
        for (var i = 0; i < user.followers.length; i++) {
          User.findOne({username:user.followers[i]}, function(err, follower){
            // console.log(follower)

            for (var j = 0; j < follower.discover.length; j++) {

              if(follower.discover[j]._id=== postid){

                follower.discover.splice(j, 1);

                follower.save();
              }
            }

          });

        }

        
      });


      res.redirect('/'+username+'/home');
      
    });
  },



  ViewProfile: function (req, res) {
  console.log(req.cookies);
  var isFollowing = req.user.following.indexOf(req.params.usersprof);


      User.find({username: req.params.usersprof}, function (err, data) {
        if (err) {
          res.send(err);
        }

        var allPosts= data[0].posts.reverse();

        var publicPosts=_.filter(allPosts, function(obj){
          return obj.privacy === false;
        });
        console.log(publicPosts);

        res.render('searchProfile', {
          user: req.params,
          otherusers: data[0],
          isFollowing: isFollowing,
          publicPosts: publicPosts,

        });

    });
  },

  UploadPic: function(req, res){
    var id = req.user._id;

    User.findById(id, function (err, data) {
      if (err) return handleErr(err);

      data.imageUrl = '/uploads/' + req.files.imageUrl.name || "/img/gravatar.jpg";
      
      data.save(function(err, user) {
        console.log('ji');
        if(err) return handleErr(err);
        // res.send(user);
        // res.redirect('/'+username+'/edit');
      });

    });

    if (!req.files.imageUrl || !req.files.imageUrl.size) {
      console.log('do nothing')
      }
    else{
      console.log(util.inspect(req.files));
      if (req.files.imageUrl.size === 0) {
                  return next(new Error("Hey, first would you select a file?"));
      }
      fs.exists(req.files.imageUrl.path, function(exists) {
        if(!exists) {
          res.end("Well, there is no magic for those who don’t believe in it!");
        }
      });
    }
    res.redirect("/"+req.user.username+"/home");


  },

  ChangePic: function(req, res){

    User.findOne({username: req.user.username}, function (err, data) {
      if (err) return handleErr(err);

      data.imageUrl = req.body.imageUrl || "/img/gravatar.jpg";
      
      data.save(function(err, user) {
        console.log('ji');
        if(err) return handleErr(err);
        res.send(user);
        // res.redirect('/'+username+'/edit');
      });

    });

  }

};

module.exports = usersController;