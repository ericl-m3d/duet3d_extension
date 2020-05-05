// const express = require('express')
// const app = express()
// const port = 3000

// #app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))



// Make a request for a user with a given ID

// VERSION 1 -----------------------------------------------------------------------------

/* NOTES
	1) first attempt to get info from DWC
	2) first attempt in storing data 

 */
/*
const axios = require('axios');


axios.get('http://192.168.1.34/rr_status?type=3')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

const Store = require('data-store');
const store = new Store({path: 'config.json'});

store.set('sample', response.data);
 */

/* EXAMPLE FOR USING SAVING FUNCTIONS

	store.set('one', 'two');
	console.log(store.data);

	store.set('x.y.z', 'boom!');

	//the x.y.z is a nested object where z is the most nested object holding the value 'boom!'

	store.set({c: 'd'});

	console.log(store.get('e.f'));

	// value is "undefined"
 */


// VERSION 2 -----------------------------------------------------------------------------

/* NOTES
	1) merged acquiring and storing data from DWC. Stored in config.json

*/

/*
const Store = require('data-store');
const store = new Store({path: 'config.json'});

const axios = require('axios');

axios.get('http://192.168.1.34/rr_status?type=3')
  .then(function (response) {
    console.log(response.data);
    store.set({'sample': response.data});

  })
  .catch(function (error) {
    console.log(error);
  });
 */

// VERSION 3 -----------------------------------------------------------------------------

/* NOTES

	Tried telnet connection. Could not connect to it (but could using PowerShell)
	Suspect that the shellPrompt parameter is the issue (host and port were verified)
	Since duet3d forums suggest telnet is unsecure, not recommend to pursue it. 
	link: https://forum.duet3d.com/topic/95/telnet-support/13

 */

/*
const Store = require('data-store');
const store = new Store({path: 'config.json'});

const axios = require('axios');

axios.get('http://192.168.1.34/rr_status?type=1')
  .then(function (response) {
    console.log(response.data);
    store.set({'sample1': response.data});

  })
  .catch(function (error) {
    console.log(error);
  });

'use strict'

// link for purpose of 'use strict': https://www.w3schools.com/js/js_strict.asp
// summary: cannot use undeclared variables

const Telnet = require('telnet-client')

async function run() {
	let connection = new Telnet()

	let params = {
		host: '192.168.1.34',
		port: 23,
		// shellPrompt: '/#',
		shellPrompt: /:~[^$]*\$\s*$/,
		timeout: 3000
	}

	
	try {
		await connection.connect(params)
	} catch (error) {
		// add here to handle the throw (a.k.a timeout)
		console.log('Timeout reached')
	}

	console.log('starting failedLogin command')
	connection.on('failedlogin',function(msg) {
		console.log("Login failed !",msg);
	});


	console.log('res: STARTING')
	let res = await connection.exec('uptime')
	console.log('res: FINISHED')

	console.log('async result:', res)
}

run()
*/

// VERSION 4 ----------------------------------------------------------------------------

/* NOTES
	There was a tip on how to send gcode through http to dwc.
	Link: https://forum.duet3d.com/topic/95/telnet-support/13
	Summary: use the "rr_gcode?gcode=<insert gcode here>" format to send gcodes
	Summary: use the "rr_status?type=<insert number here>" to retrieve DWC responses

	* The sent rr_gcode?gcode=<sample?> does not reqister in the developer tool (browser)
 */

/*
const Store = require('data-store');
const store = new Store({path: 'config.json'});

const axios = require('axios');

// axios.get('http://192.168.1.34/rr_status?type=1')
axios.get('http://192.168.1.34/rr_gcode?gcode=g28')
  .then(function (response) {
    console.log(response.data);
    store.set({'sample1': response.data});

  })
  .catch(function (error) {
    console.log(error);
  });
*/

// VERSION 5 -----------------------------------------------------------------------------

/* NOTES

	* 1st attempt to code flowchart (see google drive)
	* storing is overwriting, not yet appending.
	* use of the "store" data is only available in the axios.get function
	* response.data manipulation can only be done inside the axios.get function (THEORY ONLY)

 */

const Store = require('data-store');

const state = new Store({path: 'state.json'});
const reward = new Store({path: 'reward.json'});
const action = new Store({path: 'action.json'});

const axios = require('axios');


// retrieve DWC info object (retrieve environment STATE)

axios.get('http://192.168.1.52/rr_status?type=1')
  .then(function (response) {
    // console.log(response.data);

    //store DWC info object
    state.set({'dwc-info': response.data});

    // object filtering

    	//define filtering: removing all contents from response.data that are irrelevant
    state.del('dwc-info.status');
    state.del('dwc-info.sensors');
    state.del('dwc-info.coords.axesHomed');
    state.del('dwc-info.coords.extr');
    state.del('dwc-info.currentTool');
    state.del('dwc-info.params.atxPower');
    state.del('dwc-info.temps.tools');

    //

  })
  .catch(function (error) {
    console.log(error);
  });

// view filtered object (FO)
// console.log(store.get('dwc-info'));


// ML weight optimization (send REWARD)
	// needs development

action.set('one','122');
// console.log(mlO.data);


// ML new weight values stored
	// needs development

// Add new ML Input (from FO)
	// needs development

// Retrieve new ML Outputs
	// needs development

// Reformat ML Outputs (for sending purposes)
	// needs development

// Send ML Outputs

var address = 'http://192.168.1.52/';
var type = 'rr_gcode?gcode=';
var gcode = 'm' + action.get('one');

var httpCall = address + type + gcode;

//console.log(httpCall);

axios.get(httpCall)
// axios.get('http://192.168.1.34/rr_gcode?gcode=g28')
  .then(function (response) {
  	// no additinal processing needed

  })
  .catch(function (error) {
    console.log(error);
  });

	

/* USEFUL OVERALL LINKS --------------------------------------------------------------------
	
	Telnet = https://www.npmjs.com/package/telnet-client
	data-store =  https://www.npmjs.com/package/data-store#install
	axios = https://github.com/axios/axios

*/

// make a for loop script for syncing retrival to output from duet
// the output from the oscilloscope may need syncing for matching data input to DuetInterface
