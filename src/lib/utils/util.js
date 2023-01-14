/*
* Parse date from dd/mm/yyyy to yyyy-mm-dd
*/
export function parseDate(date) {
    let splittedDate = date.split("/") ;
    return [splittedDate[2], splittedDate[1], splittedDate[0]].join("-");
}

/*
* Parse date from yyyy-mm-dd to dd/mm/yyyy  
*/
export function reverseParseDate(date) {
    let splittedDate = date.split("-") ;
    return [splittedDate[2], splittedDate[1], splittedDate[0]].join("/");
}

/*
* Load a URL image to a given html <component> .src attribute (event based)
* and upload to DB
*/
export function uploadProfilePicture(component) {
    return function _loadImage(event) {
        // https://codepen.io/azazy/pen/EgdXxG
        let avatar = document.getElementById(component);
        avatar.src = URL.createObjectURL(event.target.files[0])
    
        //TODO: Save to db
    }
}
