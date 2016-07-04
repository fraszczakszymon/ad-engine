'use strict';

let noop = () => {};
let pubads = {
	collapseEmptyDivs: noop,
	enableSingleRequest: noop,
	disableInitialLoad: noop,
	addEventListener: noop,
	refresh: noop,
	setTargeting: noop
};

export default {
	cmd: {
		push: (callback) => {
			callback();
		}
	},
	display: noop,
	refresh: noop,
	pubads: function () {
		return pubads;
	},
	enableServices: noop,
	sizeMapping: () => {
		return {
			addSize: noop,
			build: noop
		};
	},
	defineSlot: () => {
		return {
			defineSizeMapping: () => {
				return {
					setTargeting: () => {
						return {
							setTargeting: noop
						};
					}
				};
			}
		};
	}
};