export function timeoutReject(msToTimeout) {
	return new Promise((resolve, reject) => {
		setTimeout(reject, msToTimeout);
	});
}
