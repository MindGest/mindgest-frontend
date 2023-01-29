import { goto } from '$app/navigation';
import cookie from 'cookie';

export const load = e => {
  console.log(e);
  cookie.clear('accessToken');
  goto('/auth/login');
};
