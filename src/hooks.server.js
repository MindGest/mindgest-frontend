import cookie from 'cookie';
import jwt_decode from 'jwt-decode';
import * as api from '$lib/utils/api';

export const handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  if (!cookies.accessToken) {
    // console.log('no access token');
    // await api.post('auth/refresh');
    // console.log(response);
    // return await resolve(event);
  }
  event.locals.user = cookies.accessToken && jwt_decode(cookies.accessToken);
  return await resolve(event);
};
