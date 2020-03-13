export const debounce = (callback, debounceAmount = 250) => {
  let timeoutId = null;
  return (...args) => {
    const that = this;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => callback.apply(that, args), debounceAmount);
  };
};
