const throttle = (callback: Function, delay: number) => {
  let wait = false;
  let waitingArgs: any[] | null;
  const timeoutFunc = () => {
    if (!waitingArgs) {
      wait = false;
    } else {
      callback(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };
  return (...args: any[]) => {
    if (wait) {
      waitingArgs = args;
      return;
    }
    callback(...args);
    wait = true;
    setTimeout(timeoutFunc, delay);
  };
};

export default throttle;
