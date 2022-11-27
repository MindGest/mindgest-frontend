const base = 'http://127.0.0.1:8080/api/'; // TODO: change to environment variable

const send = async ({ method, path, data, token }) =>
	fetch(base + path, {
		method,
		credentials: 'include',
		headers: {
			...(data && { 'content-type': 'application/json' }),
			...(token && { authorization: `Token ${token}` })
		},
		...(data && { body: JSON.stringify(data) })
	});

export const get = (path, token) => send({ method: 'GET', path, token });
export const del = (path, token) => send({ method: 'DELETE', path, token });
export const post = (path, data, token) => send({ method: 'POST', path, data, token });
export const put = (path, data, token) => send({ method: 'PUT', path, data, token });
