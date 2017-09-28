// Dependency
var path = require('path');

// Import list of friend data
var friends = require('../data/friends.js');

// Export API routes
module.exports = function(app) {

	// Total list of friends
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// Add new entry
	app.post('/api/friends', function(req, res) {
		// Capture the user input (which is newFriend)
      var newFriend = req.body;

      // compute best match from scores
      var bestMatch = {};

      for(var i = 0; i < newFriend.scores.length; i++) {
        if(newFriend.scores[i] == "1 (Strongly Disagree)") {
          newFriend.scores[i] = 1;
        } else if(newFriend.scores[i] == "5 (Strongly Agree)") {
          newFriend.scores[i] = 5;
        } else {
          newFriend.scores[i] = parseInt(newFriend.scores[i]);
        }
      }
      // compare newFriend scores with each friend score
      // then find the friend with the smallest difference 

      var bestMatchIndex = 0;

      //greatest score difference for a question is 4
      //greatest difference allowable is 4 * (# of questions in survey)
      var bestMatchDiff = 40;

      for(var i = 0; i < friends.length; i++) {
        var totalDiff = 0;

        for(var index = 0; index < friends[i].scores.length; index++) {
          var diffOneScore = Math.abs(friends[i].scores[index] - newFriend.scores[index]);
          totalDiff += diffOneScore;
        }

        // if totalDiff in scores < current best match, then save the index and difference
        if (totalDiff < bestMatchDiff) {
          bestMatchIndex = i;
          bestMatchDiff = totalDiff;
        }
      }

      // the best match index is used to get the best match data from the friends index
      bestMatch = friends[bestMatchIndex];

      // Put new friend from survey to array
      friends.push(newFriend);

      // return best match
      res.json(bestMatch);
  });

};