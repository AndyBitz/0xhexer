/* Returns the value of a cookie.
 * If the cookie is not set it will return null.
 *
 */
function getCookie(name) {

	let cookies = document.cookie.split(';');
	for (let i=0; i < cookies.length; i++) {
		let biscuit = cookies[i].split('=');
		if (biscuit[0].trim() == name) {
			return biscuit[1];
		}

	}

	return null;

}


function setCookie(name, value) {
	document.cookie = `${name}=${value}`;
}
 

/* Loops through array of DOM-Elements and adds a event to every one of them.
 * Don't use this on too much elements.
 * Use window.addEventListener() instead.
 */
function addEventToArray(array, event_type, event_function) {
	for (let i=0; i < array.length; i++) {
		array[i].addEventListener(event_type, event_function);
	}
}


/* Loops through an array of DOM-Elements and allows
 * to set on data type of them all to a specific value.
 *
 */
function setDataOfArray(array, data_type, data) {
	for (let i=0; i < array.length; i++) {
		array[i][data_type] = data;
	}
}