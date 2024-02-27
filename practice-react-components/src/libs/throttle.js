export default function throttle(func, wait) {
  let throttle = false;
  return function (...args) {
    if (!throttle) {
      func.apply(this, args);
      throttle = true;

      setInterval(() => {
        throttle = false;
      }, wait);
    }
  };
}
