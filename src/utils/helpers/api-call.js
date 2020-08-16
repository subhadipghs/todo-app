async function APICall(
	URI,
	endpoint,
	method,
	{ data, token, headers: customHeaders, ...customConfigs } = {}
) {
	const config = {
		method: method ?? "POST",
		body: data ? JSON.stringify(data) : undefined,
		headers: {
			"Content-Type": data ?? "application/json",
			Authorization: token ?? `Bearer ${token}`,
			...customHeaders,
		},
		...customConfigs,
	};

	return window
		.fetch(`${URI}/${endpoint}/`, config)
		.then(async (res) => {
			const response = await res.json();
			if (res.ok) {
				return Promise.resolve(response);
			} else {
				Promise.reject(response);
			}
		})
		.catch((err) => {
			Promise.reject(err);
		});
}

export { APICall };
