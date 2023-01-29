import { PUBLIC_API_URL } from '$env/static/public';

const send = async ({ method, path, data }) =>
  fetch(PUBLIC_API_URL + '/' + path, {
    method,
    credentials: 'include',
    headers: { ...(data && { 'content-type': 'application/json' }) },
    ...(data && { body: JSON.stringify(data) })
  });

export const get = path => send({ method: 'GET', path });
export const del = path => send({ method: 'DELETE', path });
export const post = (path, data) => send({ method: 'POST', path, data });
export const put = (path, data) => send({ method: 'PUT', path, data });
