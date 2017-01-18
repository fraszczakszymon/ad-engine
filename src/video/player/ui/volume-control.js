function createVolumeControl() {
	const volume = document.createElement('div'),
		speaker = document.createElement('a');

	speaker.className = 'speaker';
	speaker.appendChild(document.createElement('span'));
	volume.className = 'volume-button hidden';

	volume.appendChild(speaker);
	volume.speaker = speaker;

	return volume;
}

function add(video) {
	const volume = createVolumeControl(),
		mobileVideoAd = video.container.querySelector('video');

	volume.mute = () => {
		volume.speaker.classList.add('mute');
		video.setVolume(0);
	};
	volume.unmute = () => {
		volume.speaker.classList.remove('mute');
		video.setVolume(0.75);
	};

	volume.addEventListener('click', (e) => {
		if (video.isMuted()) {
			volume.unmute();
		} else {
			volume.mute();
		}
		e.preventDefault();
	});

	video.addEventListener('wikiaAdStarted', () => {
		if (mobileVideoAd && mobileVideoAd.muted) {
			volume.mute();
		} else {
			volume.unmute();
		}
		volume.classList.remove('hidden');
	});

	video.container.appendChild(volume);
}

export default {
	add
};
