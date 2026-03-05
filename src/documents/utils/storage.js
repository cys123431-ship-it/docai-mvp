const getLocalStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const getStorageItem = (key) => {
  const storage = getLocalStorage();
  if (!storage || !key) {
    return null;
  }

  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

export const setStorageItem = (key, value) => {
  const storage = getLocalStorage();
  if (!storage || !key) {
    return false;
  }

  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

export const removeStorageItem = (key) => {
  const storage = getLocalStorage();
  if (!storage || !key) {
    return false;
  }

  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

export const getStorageKeys = () => {
  const storage = getLocalStorage();
  if (!storage) {
    return [];
  }

  try {
    const keys = [];
    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  } catch {
    return [];
  }
};
