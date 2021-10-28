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
  return data.sort((a, b) => a.start_cost - b.start_cost);
}

export function sortProductDescendingByCreateDate(data) {

  return data.sort((a, b) => {
    return (new Date(a.created_at) - new Date(b.created_at))
  }).reverse();
}

export function formatEndDay(dateTime) {
  const maxDiff = 259200; // miliseconds
  //const diff = 50000 ;
  const diff = new Date(dateTime) -  new Date() ;
  return diff > 259200 ? 'Kết thúc: ' + formatDateTime(dateTime) : remainTime(diff);

}

const stringToDate = function (dateString) {
  const [dd, mm, yyyy] = dateString.split("/");
  return new Date(`${yyyy}-${mm}-${dd}`);
};

const remainTime = function (time) {
  const days = 84600;

  if (time > days) {
    const end_day = new Date(time).getDay() - 1 + ' ngày';
    return `Còn: ${end_day}`;
  }
  else {
    const hour = new Date(time).getHours();
    const minute = new Date(time).getMinutes();
    const second = new Date(time).getSeconds();
    const end_day = hour.toString() + ' giờ '
      + minute.toString() + ' phút '
      + second.toString() + ' giây';
    
    //return  `<a   color="red" role='text' >${end_day}</a>`
    return `Còn: ${end_day}`;

  }
}