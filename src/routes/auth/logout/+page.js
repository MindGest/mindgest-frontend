import { goto } from '$app/navigation';
// import cookie from 'cookie';

export const load = ({ cookies }) => {
  cookies.delete("accessToken");
  cookies.delete("refreshToken");
  console.log("logout");
};
