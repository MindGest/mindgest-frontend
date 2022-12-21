// import { error, redirect } from '@sveltejs/kit';

export const load = ({ /*locals,*/ url: { pathname: href } }) => {
  //   if (!locals.user) throw redirect(302, '/auth/login');
  //   if (locals.user.role !== url.pathname.split('/')[2]) throw error(403, 'Forbidden');
  const role = href.split('/')[2]; // TODO: use locals.user.role
  return { role, href };
};
