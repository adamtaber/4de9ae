const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchData = async (endpoint: string) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export default fetchData;
