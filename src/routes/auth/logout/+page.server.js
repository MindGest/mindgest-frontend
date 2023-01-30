// import { goto } from '$app/navigation';
// import cookie from 'cookie';

import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
  cookies.set('accessToken', '', { path: '/', maxAge: 0 });
  throw redirect(302, '/');
};
