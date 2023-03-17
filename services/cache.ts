import localForage from 'localforage';

export const storageSet = async (key: string, value: any) => {
  return await localForage.setItem(key, value);
};

export const storageGet = async (key: string) => {
  return await localForage.getItem(key);
};
