export default function tryProperty(obj, properties = []) {
	let propertyValue;

	for (const property of properties) {
		if (typeof property !== 'string') {
			throw new Error('property name must be a string');
		}

		if (property in obj) {
			propertyValue = obj[property];
			break;
		}
	}

	return (typeof propertyValue === 'function') ? propertyValue.bind(obj) : propertyValue;
}
