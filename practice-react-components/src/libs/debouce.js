/*
 fn이 호출되고 나서 wait 시간이 지나기 전에 다시 호출되면
  wait 시간을 reset하고 다시 wait 시간이 지나면 fn을 호출한다.
*/
export default function debounce(fn, wait) {
  let timeout = null;
  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
