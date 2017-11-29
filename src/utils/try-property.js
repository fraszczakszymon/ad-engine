export default function tryProperty(obj, properties = []) {
	for (let i = 0; i < properties.length; i += 1) {
		const property = properties[i];

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
