const API_BASE_URL = "http://localhost:3000/api/products";

const apiUrl = (urlParam) => {
    const path = (new URL(document.location)).searchParams.get(urlParam) || '';
    return new URL(API_BASE_URL + "/" + path);
};

export default apiUrl;