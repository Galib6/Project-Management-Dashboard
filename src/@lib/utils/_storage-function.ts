// storage utils functions
export const storage = {
  getToken: (): string => {
    if (typeof window === 'undefined') return '';
    const token = localStorage.getItem(`${process.env.NEXT_PUBLIC_STORAGE_PREFIX}-token`);
    if (!token) {
      return '';
    }

    return JSON.parse(token);
  },
  setToken: (token: string) => {
    if (typeof window === 'undefined') return false;
    localStorage.setItem(`${process.env.NEXT_PUBLIC_STORAGE_PREFIX}-token`, JSON.stringify(token));
  },
  removeToken: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`${process.env.NEXT_PUBLIC_STORAGE_PREFIX}-token`);
  },
  clear: () => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
  setData(data: any, key: string) {
    if (typeof window === 'undefined') return false;
    localStorage.setItem(key, JSON.stringify(data));
  },
  getData(key: string) {
    if (typeof window === 'undefined') return false;
    const item = localStorage.getItem(key);
    if (!item) {
      return false;
    }

    return JSON.parse(item);
  },
  removeData(key: string) {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(key);
  },
};
