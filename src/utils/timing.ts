export const debounce = (func: () => void, delay: number = 0) => {
  let timer: NodeJS.Timeout | undefined;
  const debounced = () =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        resolve(func());
      }, delay);
    });

  return debounced;
};
