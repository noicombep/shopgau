const API_HOST ='http://noicombep.southeastasia.cloudapp.azure.com/';

export const buildImageUrl = (path) => {
  if (!path) return "/no-image.png";

  // nếu đã là full url
  if (path.startsWith("http")) return path;

  // bỏ dấu / đầu nếu có
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return `${API_HOST}/${cleanPath}`;
};
