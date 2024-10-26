export const getCachedData = (key: string, maxAge: number) => {
  if (typeof window === 'undefined') return null;

  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date().getTime();

  if (now - item.timestamp > maxAge) {
    localStorage.removeItem(key);
    return null;
  }
  return item.data;
};

export const setCachedData = (key: string, data: any) => {
  if (typeof window === 'undefined') return;

  const item = {
    data,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(key, JSON.stringify(item));
};
