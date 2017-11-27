export default function tryProperty(obj, properties = []) {
	for (const property of properties) {
		if (typeof property !== 'string') {
			throw new Error('property name must be a string');
		}

		if (property in obj) {
			const propertyValue = obj[property];
			return (typeof propertyValue === 'function') ? propertyValue.bind(obj) : propertyValue;
		}
	}

	return null;
}
