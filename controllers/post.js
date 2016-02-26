var User = require('../models/users.js');
var _ =  require('underscore');

var postController = {

  Upvote: function(req, res){
    var currentUser = req.user._id;
      var username =req.body.userPosted;
      var postid = req.body.thisPost;



      User.findOne({username:username}, function(err, user){
        if (err) return handleErr(err);


        for (var i = 0; i < user.posts.length; i++) {

            if(user.posts[i]._id=== postid){


              if(user.posts[i].uwv.length===0){
                user.posts[i].uwv.push(currentUser);
                    user.posts[i].rating +=1;
                    user.save();
              }
              else{

                var usersVoted = user.posts[i].uwv;
                var thisUser = currentUser.toString();


                var userVoted = _.filter(usersVoted, function(obj){
                  var x = obj.toString();

                  return x === thisUser;
                });
                  var y = userVoted.toString();

                  if(y===thisUser){
                    console.log('do nothing');
                  }
                  else{
                    console.log('hi');
                          user.posts[i].uwv.push(currentUser);
                          user.posts[i].rating +=1;
                          user.save();
                          return false;
                  }

            }
          }

      }


      // Rating by followers
      for (var i = 0; i < user.followers.length; i++) {
          User.findOne({username:user.followers[i]}, function(err, follower){

            console.log(currentUser);

            for (var j = 0; j < follower.discover.length; j++) {

              if(follower.discover[j]._id=== postid){

                if(follower.discover[j].uwv.length===0){
                      follower.discover[j].uwv.push(currentUser);
                          follower.discover[j].rating +=1;
                          follower.save();
                    }
                    else{


                      var usersVoted = follower.discover[j].uwv;
                      var thisUser = currentUser.toString();

                      var userVoted = _.filter(usersVoted, function(obj){
                        var x = obj.toString();

                        return x === thisUser;
                      });
                        var y = userVoted.toString();

                        if(y===thisUser){
                          console.log('do nothing');
                        }
                        else{
                          console.log('hi');
                                follower.discover[j].uwv.push(currentUser);
                                follower.discover[j].rating +=1;
                                follower.save();
                                return false;
                        }

                    }

              }
            }

          });

        }

      });

  },

  Downvote: function(req, res) {
      var currentUser = req.user._id;
      var username =req.body.userPosted;
      var postid = req.body.thisPost;

     User.findOne({username:username}, function(err, user){
        if (err) return handleErr(err);


        for (var i = 0; i < user.posts.length; i++) {

            if(user.posts[i]._id=== postid){


              if(user.posts[i].uwv.length===0){
                user.posts[i].uwv.push(currentUser)
                    user.posts[i].rating -=1
                    user.save();

              }
              else{

                var usersVoted = user.posts[i].uwv;
                var thisUser = currentUser.toString();


                var userVoted = _.filter(usersVoted, function(obj){
                  var x = obj.toString();

                  return x === thisUser;
                })
                  var y = userVoted.toString();

                  if(y===thisUser){
                    console.log('do nothing');
                  }
                  else{
                    console.log('hi');
                          user.posts[i].uwv.push(currentUser);
                          user.posts[i].rating -=1;
                          user.save();
                          return false;
                  }

            }
          }
        }

      });

  }

};

module.exports = postController;