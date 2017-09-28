// Dependency
var path = require('path');

// Export HTML routes
module.exports = function(app) {

	// Survey page
	app.get('/survey', function(req, res) {
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});

	// Home page
	app.use(function(req, res) {
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});
};