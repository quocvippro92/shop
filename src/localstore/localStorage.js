export const localStorageUlti = (key, defaultValue) => {
  return {
    get: () =>
      JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue)),
    set: (value) => localStorage.setItem(key, JSON.stringify(value)),
    remove: () => localStorage.removeItem(key),
  };
};
