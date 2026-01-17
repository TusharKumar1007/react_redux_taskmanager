export const apiFetch = async (path, options = {}) => {
  const baseURL = import.meta.env.VITE_API_BASE || "";
  const url = baseURL + path;
  
  

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "API request failed");
  }

  return response;
};
