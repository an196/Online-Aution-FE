import dateFormat from 'dateformat';

export function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};


export function formatProductName(name) {
  return name.length > 21 ? name.substring(0, 22) + '...' : name;

}

export function formatPrice(price) {
  return price ? price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '₫' : null;

}

export function formatDateTime(dateTime) {
  return dateTime ? dateFormat(dateTime, "dd/mm/yyyy hh:mm:ss") : "Không có";
}

export function formatBiddertName(name) {
  const length = name.length - 5;
  return "****" + name.substring(length);

}

export function sortProductAscendingByPrice(data) {
  return data.sort((a, b) => a.start_cost > b.start_cost);
}

export function sortProductDescendingByCreateDate(data) {
  console.log(data)
  return data.sort((a, b) => {
    return new Date(a.created_at).getTime() -
      new Date(b.created_at).getTime()
  }).reverse();
}

const stringToDate = function (dateString) {
  const [dd, mm, yyyy] = dateString.split("/");
  return new Date(`${yyyy}-${mm}-${dd}`);
};