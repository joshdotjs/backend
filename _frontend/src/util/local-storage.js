// ==============================================

function setWithExpiry({ key, value, ttl }) {
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

// ==============================================

function getWithExpiry( key ) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value;
}

// ==============================================

// const getLS = (key /*: string */) => JSON.parse(localStorage.getItem(key));
const getLS = (key /*: string */) => getWithExpiry( key );

// ==============================================

// const setLS = (key, value /*: string, object */) => localStorage.setItem(key, JSON.stringify(value));
// const setLS = (key, value /*: string, object */) => setWithExpiry({ key, value, ttl: 1e3 * 60**2 * 24}); // 1day = (1000ms./s.  *  60s./min.  *  60min./hr.  *  24hr./day) ms./day
const setLS = (key, value /*: string, object */) => setWithExpiry({ key, value, ttl: 1e3 * 60**2 * 2}); // 1hr = (1000ms./s.  *  60s./min.  *  60min./hr.) ms./hr.

// ==============================================

const removeLS = (key /*: string */) => localStorage.removeItem(key);

// ==============================================

export { 
  getLS, setLS, removeLS,
 };