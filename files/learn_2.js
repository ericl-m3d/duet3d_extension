// rlean.js

// for debugging purposes
console.log('learn opened');

// Initialize ----------------------------------------------------------------

// replay memory
var memory = { 
	init: function(episodelimit = 0, timeStepLimit = 0, batchSize = 2, exploreRate = 0.7) {
		
		// instantiate data object
		this.data = {};

		// set default size of minibatch
		this.batchSize = batchSize;

		// define default limit on max iterations
		this.iterationLimits = {
			'episode': episodelimit,
			'timeStep': timeStepLimit
		}

		this.exploreRate = exploreRate;
	},

	length: function() {

		// initialize length
		var length = 0;

		// find length of this.data
		for ( var p in this.data) {
			if ( this.data.hasOwnProperty(p)) {
				length++;
			}
		}

		// return length of this.data
		return length; 
	},

	makeBatch: function() {

		// instantiate minibatch object
		this.batch = {};

		// add content to batch
			// does nothing (for now)


	}
}

// house custom math operations
var customMath = {
	randomWeight: function(min = 0, max = 1) {

		// return random weight number
		return Math.random() * (max - min) + min;
	}

}

// action-value function (Q)
var value = {
	init: function (weightCount= 4, resetInterval= 4) {

		// instantiate data
			// note: https://stackoverflow.com/questions/2330767/what-is-the-difference-between-instantiated-and-initialized
		this.data = {};

		// add random value to specified number of weights (weightCount)
		for (var i= 0; i <= weightCount; i++) {

			// dynamically addi new objects
			this.data['weight'+i] = customMath.randomWeight()
		}

		// initialize reset interval value (aka C step) to default
		this.resetInterval = resetInterval;
	},

	reset: function(settings) {

		// reset weights
			// does nothing (for now)

	}

}

// capture environment
var image = {
	get: function() {

		// capture image
			// does nothing (for now)

		return 3;
	}
}

// store & manipulate sequence (set of states)
var sequence = {
	init: function() {

		// instantiate data object with two default states
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

		// instantiate output object
		this.output = {};
	},

	preprocess: function(state) {

		// preprocess latest state ONLY
			// does nothing (for now)

	},

	save: function(state,action,nextState) {

		// save here
			// does nothing (for now)
	}
};

// perform actions
var emulator = {

	execute: function (input) {

		// for debugging purposes 
		console.log('action executed')

		// emulating details here
			// nothing (for now)

		// TEMPORARY storage of observation (1 of 2) [REPONSE]
		this.reward = 0;

		// TEMPORARY storage of observation (2 of 2) [NEW ENVIRONMENT STATE]
		this.nextState = image.get();
	}

};


// Initialize Replay Memory ------------------------------------------------
var replay = Object.create(memory);
replay.init();


// Initialize Action-Value & Target Action-Value Q Functions --------------

var action = Object.create(value);
action.init();

var target = Object.create(value);
target.init();
	// note: target and action MUST HAVE EQUAL number of weights
	// note: may want to find a way to set the random weights used in action, to be in target

// for debugging purposes
console.log(action);
console.log(target);

// Execute episodes ---------------------------------------------------------

	// note: an episode ends when it reaches terminal state
	// note: terminal state is the goal (https://towardsdatascience.com/practical-reinforcement-learning-02-getting-started-with-q-learning-582f63e4acd9)

var episodelimit = replay.iterationLimits.episode;

for (var episode = 0 ;episode <= episodelimit; episode++) {
		// start an episode

	// for debugging purposes
	console.log('episode = ' + episode);

	// initialize sequence
	var state = Object.create(sequence);
	state.init();

	//initialize preprocesssed sequence
	var processedState = Object.create(sequence);
	processedState.init();
	processedState.preprocess(state);
		// note: processed state refers to reducing input info from Atari screen, may be analogous to DWC input filtering step
	

	var iterationLimit = replay.iterationLimits.timeStep;
	for (var iteration= 0 ; iteration <= iterationLimit; iteration++) {

		// for debugging purposes
		console.log('iteration = ' + iteration);

		// explorative decision making
		var randomAction = Math.random() > replay.exploreRate;

		if (randomAction) {
			
			// select random action
			action = 1;
				// does nothing (for now)

			// for debugging purposes
			console.log('random action selected');

		}
		else {
			
			// select highest value
			action = 2;
				// does nothing (for now)

			// for debugging purposes
			console.log('highest action selected');

		}

		// emulate
		emulator.execute(action);

		// save current state, action, and observed image (x_t+1)
		state.save(state.data['state'+ 0], action, emulator.nextState);
			// note: the 3 objects are stored as one; has a notation of s_t+1 (a.k.a the next time step)

		// preprocess latest (next) time step
		processedState.preprocess(state); 
			// note: iteration reference number can be figured out (dynamically), no need to specify 

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
			if (replay.batchSize == 1) { 
					// condition (described in words): if the episode terminates at step i+1
					// note: THE CURRENT IF CONDITION IS NOT REAL/REPRESENTATIVE OF THE INTENT (ABOVE)

				// set equal to emulator's observed reward
				update['sample'+ 0] =  replay.batch['sample'+ 0].reward;
			}
			else {

				// set equal to q-learning update equation
				// update['sample'+ 0] = replay.batch['sample'+ 0].reward + 4;
					// note: content on discounting factor: https://stats.stackexchange.com/questions/221402/understanding-the-role-of-the-discount-factor-in-reinforcement-learning
			}
		}

		// initialize loss
		var loss = {};

		// calculate loss
		for (var i= 0; i <= replay.batchSize; i++ ) {

			// dyanmically change loss values
			loss['sample1'+ 0] = 4;
				// does nothing (for now)
		}

		// perform gradient step
			// does nothing (for now)

		// every C step (a.k.a time steps), reset target action-value function
		if ((1/target.resetInterval) % 1 == 0 && 1 != 0) { 
				// note: https://stackoverflow.com/questions/2304052/check-if-a-number-has-a-decimal-place-is-a-whole-number
			
			// reset target action-value (Q) function
			target.reset(state.data);

		}


	}

	// for debugging purposes
	console.log(state.data);
	console.log(replay);


}

