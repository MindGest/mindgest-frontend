import cookie from 'cookie';
import jwt_decode from 'jwt-decode';
//import * as api from '$lib/utils/api';

export const handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  //if (!cookies.accessToken) {
  //   api.post('auth/refresh');
  //}
  event.locals.user = cookies.accessToken && { role: jwt_decode(cookies.accessToken).role };
  return await resolve(event);
};
