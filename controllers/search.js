var searchController = {
  index: function (req, res) {
  res.render('search', {user: req.user});
}
};

module.exports = searchController;