import { createBlock, inputSearch, movieList, clearMovieBlock, addMovie, triggerMode, createStyle } from './dom.js';
let searchLast = null;
const getData = (url) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.Search);
};
const debounce = (() => {
  let timer = null;
  return (cb, ms) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(cb, ms);
  };
})();
const inputSearchHandler = (e) => {
  debounce(() => {
    const searchText = e.target.value.trim();
    if (searchText && searchText.length > 3 && searchLast !== searchText) {
      if (!triggerMode) clearMovieBlock(movieList);
      getData(`http://www.omdbapi.com/?i=tt3896198&apikey=f59b3819&s=${searchText}`)
        .then((movies) => movies.forEach((movie) => addMovie(movie)))
        .catch(console.log);
    }
    searchLast = searchText;
  }, 1000);
};
export const initSearcher = () => {
  createBlock();
  createStyle();
  inputSearch.addEventListener('keyup', inputSearchHandler);
};
