import { PUBLIC_API_URL } from '$env/static/public';
import jwt_decode from "jwt-decode";
import { goto } from '$app/navigation';

const send = async ({ method, path, data, token }) =>
  fetch(PUBLIC_API_URL + '/' + path, {
    method,
    credentials: 'include',
    headers: {
      ...(data && { 'content-type': 'application/json' }),
      ...{ authorization: getCookie('accessToken') }
    },
    ...(data && { body: JSON.stringify(data) })
  });

const setC = (name, value, days) => {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

const checkAuthentication = async (role) => {
  let accessToken = getCookie('accessToken');
  if(accessToken==null){
    goto('/');
  }
  let decodedJWT = jwt_decode(accessToken);
  let decodedRefresh = jwt_decode(getCookie('refreshToken'));
  let seconds = new Date().getTime() / 1000;
  if(seconds>decodedJWT['exp'] && seconds>decodedRefresh['exp']){
    goto('/');
  }
  else{
    if(decodedJWT['role']!=role){
      if(decodedJWT['role']==="therapist"){
        goto("/user/therapist/dashboard")
      }
      else if(decodedJWT['role']==="guard"){
        goto("/user/guard/dashboard")
      }
      else if(decodedJWT['role']==="accountant"){
        goto("/user/accountant/dashboard")
      }
      else if(decodedJWT['role']==="intern"){
        goto("/user/intern/dashboard")
      }
      else{
        console.log("ERRO")
      }
    }
  }
}

const getC = name => {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const getMonthName = number => {
  let array = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];
  return array[number - 1];
};

export const check = (role) => checkAuthentication(role);
export const getMonth = number => getMonthName(number);
export const setCookie = (name, value, days) => setC(name, value, days);
export const getCookie = name => getC(name);
export const get = path => send({ method: 'GET', path });
export const del = path => send({ method: 'DELETE', path });
export const post = (path, data) => send({ method: 'POST', path, data });
export const put = (path, data) => send({ method: 'PUT', path, data });
