import { error, redirect } from '@sveltejs/kit';

export const load = ({ locals, url }) => {
  if (!locals.user) throw redirect(302, '/auth/login');
  if (locals.user.role !== url.pathname.split('/')[2]) throw error(403, 'Forbidden');
  return { role: locals.user.role, href: url.pathname };
};
