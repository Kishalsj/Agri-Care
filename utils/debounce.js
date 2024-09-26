const DELAY = 270;

export default function debounce(func) {
  let timer;

  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer); //every time the user hits a key under 300 ms, the invocation for function handleChange reset the timer or cancels the previous plans with handleChange
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, DELAY);
  };
}
