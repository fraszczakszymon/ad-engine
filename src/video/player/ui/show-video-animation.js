function hideVideo(video, params) {
	video.container.classList.add('hide');
}

function showVideo(video, params) {
	video.container.classList.remove('hide');
	video.container.style.position = 'absolute';
	video.container.style.zIndex = 100;
}

function add(video, params) {
	video.addEventListener('wikiaAdStarted', () => {
		showVideo(video, params);
	});

	video.addEventListener('wikiaAdCompleted', () => {
		hideVideo(video, params);
	});
}

export default {
	add
};
