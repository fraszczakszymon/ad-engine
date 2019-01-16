/* eslint-disable import/no-extraneous-dependencies, no-console */
const portfinder = require('portfinder');

portfinder.getPort((err, port) => {
	console.log(port);
});
