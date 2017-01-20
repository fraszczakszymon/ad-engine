import CloseButton from './close-button';
import PauseOverlay from './pause-overlay';
import ProgressBar from './progress-bar';
import ShowVideoAnimation from './show-video-animation';
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
	const elements = {
		closeButton: CloseButton,
		pauseOverlay: PauseOverlay,
		progressBar: ProgressBar,
		volumeControl: VolumeControl
	};

	if (params.splitLayoutVideoPosition) {
		elements.showVideoAnimation = ShowVideoAnimation;
	} else {
		elements.toggleAnimation = ToggleAnimation;
	}

	uiElements.forEach((element) => {
		if (elements[element]) {
			elements[element].add(video, params);
		}
	});
}

export default {
	setup
};
