// file requirement w/ friends array
var friends = require('../data/friends.js');

module.exports = function (app) {

	// get request
	app.get('/api/friends', function (req, res) {
		res.json(friends);
	});

	// port request
	app.post('/api/friends', function (req, res) {

		// object to fill with match
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};

		// parsing user data
		var userData = req.body;
		var userName = userData.name;
		var userPhoto = userData.photo;
		var userScores = userData.scores;

		var totalDifference = 0;

		// loops through all the friends in the database
		for (var i = 0; i < friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;

			// loops through all the scores
			for (var j = 0; j < friends[i].scores[j]; j++) {

				// calculate different between scores
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// if the calculated differences are less than of the default match
				if (totalDifference <= bestMatch.friendDifference) {
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}

		// saves user data to database
		friends.push(userData);

		// returns the match user got
		res.json(bestMatch);

	});

}