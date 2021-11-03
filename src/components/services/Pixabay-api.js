function fetchPictures(request, page) {
  return fetch(
    `https://pixabay.com/api/?q=${request}&page=${page}&key=23343494-643d22eb41994b430f7c237c0&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`We have not pictures for request ${request}`),
    );
  });
}

const api = {
  fetchPictures,
};

export default api;
