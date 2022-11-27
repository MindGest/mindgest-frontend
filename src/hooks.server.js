import cookie from 'cookie';
import jwt_decode from 'jwt-decode';

export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.user = cookies.accessToken && { role: jwt_decode(cookies.accessToken).role };
	return await resolve(event);
};
