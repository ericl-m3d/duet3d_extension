// DQN (Deep Q-learning Network)
// Reinforcment learning by using highest, estimated Q-value
// Q-value estimatations (of entire action space) done through neural networks
// For more info: https://towardsdatascience.com/introduction-to-various-reinforcement-learning-algorithms-i-q-learning-sarsa-dqn-ddpg-72a5e0cb6287

// -------------------------------------------------------------------------

// FUNCTION: Get Random Number between two values


var learning = {
	init: function(weightA, weightB,details) {
		this.weightA = weightA;
		this.weightB = weightB;
		this.details = details;

		//console.log(weightA+weightB);
		//onsole.log(details);

	},
	randomNumber : function (min,max) {
		//return 5;
		return Math.random()*(max-min) + min;
	}
}


// ----------------------------------------------------------------------------

// Initialize replay memroy D to capacity N


// Initialize action-value function(Q) with random weights (theta)

var action = Object.create(learning);
action.init(action.randomNumber(0,1),action.randomNumber(0,1),['dan'])

var target = Object.create(learning);
target.init(action.randomNumber(0,1),action.randomNumber(0,1),{peter:{name: {first:'dan',last:'xx'},age:25}})

console.log(target.details.peter.name.first)