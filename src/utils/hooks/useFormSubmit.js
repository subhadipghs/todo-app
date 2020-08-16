import React, { useReducer } from "react";
import axios from "axios";

const initialState = {
	loading: false,
	res: [],
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "FETCH_LOADING":
			return {
				...state,
				loading: true,
			};
		case "FETCH_SUCCESS":
			return {
				...state,
				res: action.payload,
				loading: false,
			};
		case "FETCH_ERROR":
			return {
				...state,
				error: action.error,
				loading: false,
			};
		default:
			return state;
	}
}

const useFormSubmit = (uri, {data, token, headers: customHeaders, ...customConfig} = {}) => {
	const [{ loading, res, error }, dispatch] = React.useReducer(
		reducer,
		initialState
	);

	const config = {
		method: data ? "POST" : "GET",
		body: data ? JSON.stringify(data) : undefined,
		headers: {
			Authorization: token ? `Bearer ${token}` : undefined,
			"Content-Type": data ? "application/json" : undefined,
			...customHeaders,
		},
		...customConfig,
	};

	const formResult = React.useCallback(() => {
		window
			.fetch(`${uri}`, config)
			.then(async (response) => {
				dispatch({ type: "FETCH_LOADING" });
				if (response.ok) {
					dispatch({ type: "FETCH_SUCCESS", payload: response });
				}
			})
			.catch((error) => {
				dispatch({
					type: "FETCH_ERROR",
					error: "Please reauthenticate",
				});
			});
	}, [{ loading, res, error }]);

	return formResult;

};

export default useFormSubmit;