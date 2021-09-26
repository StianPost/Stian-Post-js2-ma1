export function saveToStorage(keyName, object) {
	localStorage.setItem(keyName, JSON.stringify(object));
}

export function getStorageItem(keyName) {
	if (localStorage.getItem(keyName) !== null) {
		return JSON.parse(localStorage.getItem(keyName));
	} else {
		return [];
	}
}
