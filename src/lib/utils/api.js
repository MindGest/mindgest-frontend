const base = 'http://localhost:8080/api/'; // TODO: change to environment variable

const send = async ({ method, path, data, token }) =>
  fetch(base + path, {
    method,
    credentials: 'include',
    headers: {
      ...(data && { 'content-type': 'application/json' }),
      ...(token && { 'authorization':  getCookie("accessToken")}),
    },
    ...(data && { body: JSON.stringify(data) })
  });

const setC = (name,value,days) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
const getC = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

const getMonthName = (number) =>{
  let array = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  return array[number-1];
}

export const getMonth = (number) => getMonthName(number);
export const setCookie = (name, value, days) => setC(name,value,days);
export const getCookie = (name) => getC(name);
export const get = (path, token) => send({ method: 'GET', path, token });
export const del = (path, token) => send({ method: 'DELETE', path, token });
export const post = (path, data, token) => send({ method: 'POST', path, data, token });
export const put = (path, data, token) => send({ method: 'PUT', path, data, token });
