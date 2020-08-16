import { APICall } from "./api-call";

const authKey = "token";
/**
 * Get the jwt token from the localstorage
 * @return {string} token
 */
function getAuthToken() {
	return window.localStorage.getItem(authKey);
}

/**
 * Set the auth token
 * @param {string} options.user the auth user
 */
function setAuthToken({ user }) {
	window.localStorage.setItem(authKey, user.token);
	return user;
}

/**
 * Login handler
 * @param  {string} options.email    email address
 * @param  {string} options.password password
 * @return {Promise}
 */
function login({ email, password }) {
	return APICall("user/login", { email, password }).then(setAuthToken);
}
/**
 * Register user hanlde
 * @param  {string} options.name     name
 * @param  {string} options.email    email
 * @param  {string} options.password password
 * @return {Promise}
 */
function signup({ name, email, password }) {
	return APICall("user/register", { name, email, password }).then(
		setAuthToken
	);
}

/**
 * Logout handler
 * @return {null}
 */
function logout() {
	window.localStorage.removeItem(authKey);
}

export { authKey, getAuthToken, setAuthToken, signup, logout };
