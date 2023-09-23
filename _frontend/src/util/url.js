const apiUrl = (str) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const endpoint = `${API_URL}/api/${str}`;
  return endpoint;
};

export { apiUrl };