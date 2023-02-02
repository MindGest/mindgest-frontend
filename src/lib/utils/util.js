import * as api from '$lib/utils/api';

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
 *   Request Profile Data
 */
export async function requestProfileInfo(infoRequestURL, imgRequestURL) {
  let responseInfo = await api.get(infoRequestURL);
  let responsePhoto = await api.get(imgRequestURL);
  if (responseInfo.ok) {
    let data = (await responseInfo.json())['data'];

    data.photo = null;
    if (responsePhoto.ok) {
      let blob = await responsePhoto.blob();
      data.photo = URL.createObjectURL(blob);
    }
    return data;
  } else {
    alert('Erro a carregar o perfil');
  }
  return null;
}
