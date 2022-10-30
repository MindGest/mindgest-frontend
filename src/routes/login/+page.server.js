import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
  if (locals.user) throw redirect(302, `/user/${locals.user.role}/dashboard`);
};
