import { redirect } from '@sveltejs/kit';

export const load = ({ locals, url }) => {
  if (url.pathname !== '/auth/logout' && locals.user) {
    throw redirect(302, `/user/${locals.user.role}/dashboard`);
  }
};
