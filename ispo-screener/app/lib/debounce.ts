const debounce = (() => {
  let timeout: NodeJS.Timeout | undefined;
  return async (cb: () => void, wait: number = 1000) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb();
    }, wait);
  };
})();

export default debounce;
