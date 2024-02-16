const debounce = <T extends Function>(cb: T, wait: number = 1000) => {
  let timeout: NodeJS.Timeout | undefined;
  return async (...args: any) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, wait);
  };
};

export default debounce;
