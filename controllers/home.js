var homeController = {
  index: function (req, res) {

  var posts = req.user.posts.reverse();

  res.render('home', {
    user: req.user,
    posts: posts
  });
}
};

module.exports = homeController;