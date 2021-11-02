function fetchPictures(request) {
  return fetch(
    `https://pixabay.com/api/?q=${request}&page=1&key=23343494-643d22eb41994b430f7c237c0&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Нет картинок по запросу ${request}`));
  });
}

const api = {
  fetchPictures,
};

export default api;
