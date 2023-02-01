import cookie from 'cookie';
import jwt_decode from 'jwt-decode';
// import * as api from '$lib/utils/api';

export const handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  if (cookies.accessToken) {
    const { role, admin } = jwt_decode(cookies.accessToken);
    event.locals.user = { role, admin };
  } else {
    // console.log('no access token');
    // await api.post('auth/refresh');
    // console.log(response);
    // return await resolve(event);
  }
  return await resolve(event);
};
