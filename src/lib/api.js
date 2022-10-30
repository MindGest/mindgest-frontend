const base = 'mindgest.dei.uc.pt/api/';

const send = async ({ method, path, data, token }) =>
	fetch(base + path , {
		method,
		headers: {
			...(data && { 'content-type': 'application/json' }),
			...(token && { authorization: `Token ${token}` })
		},
		...(data && { body: JSON.stringify(data) })
	}).then(response => response.json());

export const get = (path, token) => send({ method: 'GET', path, token });
export const del = (path, token) => send({ method: 'DELETE', path, token });
export const post = (path, data, token) => send({ method: 'POST', path, data, token });
export const put = (path, data, token) => send({ method: 'PUT', path, data, token });
