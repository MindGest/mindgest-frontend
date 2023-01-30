import * as api from '$lib/utils/api';
import { data } from 'autoprefixer';

/*
 * Parse date from dd/mm/yyyy to yyyy-mm-dd
 */
export function parseDate(date) {
  if (date != undefined && date != null && date != '') {
    let splittedDate = date.split('/');
    return [splittedDate[2], splittedDate[1], splittedDate[0]].join('-');
  }
}

/*
 * Parse date from yyyy-mm-dd to dd/mm/yyyy
 */
export function reverseParseDate(date) {
  if (date != undefined && date != null && date != '') {
    let splittedDate = date.split('-');
    return [splittedDate[2], splittedDate[1], splittedDate[0]].join('/');
  }
}

/*
 * Load a URL image to a given html <component> .src attribute (event based)
 * and upload to DB
 */
export function uploadProfilePicture(component) {
  return function _loadImage(event) {
    // https://codepen.io/azazy/pen/EgdXxG
    let avatar = document.getElementById(component);
    avatar.src = URL.createObjectURL(event.target.files[0]);

    const formData = new FormData();
    formData.append('picture', event.target.files[0]);

    fetch('http://localhost:8080/api/user/profile/picture', {
      method: 'PUT',
      headers: {
        ...{ authorization: api.getCookie('accessToken') }
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  };
}

/*
 *   Request Profile Data
 */
export async function requestProfileInfo(infoRequestURL, imgRequestURL) {
    const response = await api.get(infoRequestURL, {});
    const response2 = await api.get(imgRequestURL, {});
    if (response.ok) {
      let json = await response.json();
      let jsonInfo = json['info'];
      
      let photo = null
      if (response2.ok) {
        let blob = await response2.blob();
        photo = URL.createObjectURL(blob);
      }
      
      let data = {
        name: jsonInfo['name'],
        id: jsonInfo['id'],
        birth_date: jsonInfo['birth_date'],
        address: jsonInfo['address'],
        email: jsonInfo['email'],
        phone_number: jsonInfo['phone_number'],
        tax_number: jsonInfo['tax_number'],
        role: jsonInfo['role'],
        photo: photo
      };
      return data;
    } else {
        alert("Erro a carregar o perfil")
    }
    return null;
}
