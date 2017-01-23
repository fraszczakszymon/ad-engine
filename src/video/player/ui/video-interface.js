import CloseButton from './close-button';
import PauseOverlay from './pause-overlay';
import ProgressBar from './progress-bar';
import ShowVideoAnimation from './show-video-animation';
import ToggleAnimation from './toggle-animation';
import VolumeControl from './volume-control';

function setup(video, uiElements, params) {
	const mapping = {
		closeButton: CloseButton,
		pauseOverlay: PauseOverlay,
		progressBar: ProgressBar,
		volumeControl: VolumeControl
	};

	mapping.toggleAnimation = params.splitLayoutVideoPosition ? ShowVideoAnimation : ToggleAnimation;

	uiElements.forEach((element) => {
		if (mapping[element]) {
			mapping[element].add(video, params);
		}
	});
}

export default {
	setup
};
