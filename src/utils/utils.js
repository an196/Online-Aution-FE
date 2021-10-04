import dateFormat from 'dateformat';

export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
};


export function formatProductName(name){
  return name.substring(0, 22) +'...';

}


export function formatDateTime(dateTime){
  return dateTime ? dateFormat(dateTime, "dd/mm/yyyy hh:mm:ss") : "Không có";
}