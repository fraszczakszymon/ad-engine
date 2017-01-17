import CloseButton from './close-button';
import PauseOverlay from './pause-overlay';
import ProgressBar from './progress-bar';
import ToggleAnimation from './toggle-animation';
import VolumeControl from './volume-control';

const moduleMapping = {
	closeButton: CloseButton,
	pauseOverlay: PauseOverlay,
	progressBar: ProgressBar,
	toggleAnimation: ToggleAnimation,
	volumeControl: VolumeControl
};

function setup(video, uiElements, params) {
	uiElements.forEach((element) => {
		if (moduleMapping[element]) {
			moduleMapping[element].add(video, params);
		}
	});
}

export default {
	setup: setup
}
