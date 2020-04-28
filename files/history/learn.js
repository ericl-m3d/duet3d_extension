// rlean.js

// sample

console.log('learn opened');

// Initialize ----------------------------------------------------------------

// replay memory
var memory = { 
	init: function() {
		this.data = {};
		this.batchSize = 2;
		this.batch = {};
	},

	length: function() {
		var length = 0;
		for ( var p in this.data) {
			if ( this.data.hasOwnProperty(p)) {
				length++;
			}
		}
		return length; 
	},

	randomInteger: function(min,max) {
  		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive

	},

	getBatchSize: function() {
		return batchSize;
	},

	makeBatch: function() {
		// add content to batch


	}
};

// action-value function (Q)
var value = {
	init: function (weight1,weight2) {
		this.data = {
			'weight1': weight1,
			'weight2': weight2
		}
		this.resetInterval = 4;
	},

	randomNumber: function(min, max) {
		return Math.random() * (max - min) + min;
	},

	reset: function(settings) {

	}

};

// capture environment
var image = {
	get: function() {
		// capture image

		return 3;
	}
}

// store & manipulate sequence (set of states)
var sequence = {
	init: function() {
		this.data = {
			'state0': {
				'state': image.get(),
				'action': 0,
				'nextState': 0
			},
			'state1': {
				'state': 1,
				'action': 1,
				'nextState': 1
			}

		}
		this.output = {};
	},

	preprocess: function(state) {
		// preprocess latest state ONLY

	},

	save: function(state,action,nextState) {
		// save here
	}
};

// perform actions
var emulator = {

	execute: function (input) {
		console.log('action executed')

		this.reward = 0;

		this.nextState = image.get();
	}

};

var reward = 0;

// Initialize Replay Memory ------------------------------------------------
var replay = Object.create(memory);
replay.init();


// Initialize Action-Value & Target Action-Value Q Functions --------------

var action = Object.create(value);
action.init(action.randomNumber(1,10),action.randomNumber(1,10));

var target = Object.create(value);
target.init(action.randomNumber(1,10),action.randomNumber(1,10));

console.log(action);
console.log(target);

// Execute episodes ---------------------------------------------------------

// note: an episode ends when it reaches terminal state
// note: terminal state is the goal (https://towardsdatascience.com/practical-reinforcement-learning-02-getting-started-with-q-learning-582f63e4acd9)


var episode = 0;
const episodelimit = 1;

for (episode ;episode <= episodelimit; episode++) {
	console.log('episode = ' + episode);

	// initialize sequence
	var state = Object.create(sequence);
	state.init();

	//initialize preprocesssed sequence
	var processedState = Object.create(sequence);
	processedState.init();
	processedState.preprocess(state);
	

	var iteration = 0;
	iterationLimit = 2;
	for (iteration ; iteration <= iterationLimit; iteration++) {
		console.log('iteration = ' + iteration);

		// explore decision making
		var explore = 0.7;
		var randomAction = Math.random() > explore;

		if (randomAction) {
			// select random action
			console.log('random action selected');
			action = 1;
		}
		else {
			// select highest value
			console.log('highest action selected');
			action = 2;

		}

		// emulate
		emulator.execute(action);

		// save current state, action, next state
		state.save(state.data['state'+ 0], action, emulator.nextState);

		// preprocess sequence
		processedState.preprocess(state); // note: iteration can be figured out

		// store transition 
		replay.data['object'+1] = {
			'preprocessedCurrentState': processedState.data['state'+ 0],
			'action': action,
			'reward': emulator.reward,
			'preprocessedNextState': processedState.data['state'+ 1] 
		};

		// sample random batch from replay memory
		replay.makeBatch();

		// initialize update
		var update = {};

		// update based on replay memory
		for (var i = 0; i <= replay.batchSize; i++ ) {
			if (replay.batchSize == 1) { // condition (in words): if the episode terminates at step i+1
				// note: IF CONDITION NOT REAL (ABOVE)
				update['sample'+ 0] =  replay.batch['sample'+ 0].reward;
			}
			else {
				update['sample'+ 0] = replay.batch['sample'+ 0].reward + 4;
				// note: content on discounting factor: https://stats.stackexchange.com/questions/221402/understanding-the-role-of-the-discount-factor-in-reinforcement-learning
			}
		}

		// initialize loss
		var loss = {};

		// calculate loss
		for (var i= 0; i <= replay.batchSize; i++ ) {
			loss['sample1'+ 0] = 4;
		}

		// perform gradient step

		// every C step (a.k.a time steps), reset target action-value function
		if ((1/target.resetInterval) % 1 == 0 && 1 != 0) { // note: https://stackoverflow.com/questions/2304052/check-if-a-number-has-a-decimal-place-is-a-whole-number
			// reset target action-value (Q) function
			target.reset(state.data);

		}


	}

	console.log(state.data);
	console.log(replay);



}

