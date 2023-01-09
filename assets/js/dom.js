export const createElement = ({ type, attrs, container, position = 'append', event, handler }) => {
  const el = document.createElement(type);
  Object.keys(attrs).forEach((key) => {
    if (key !== 'innerHTML') el.setAttribute(key, attrs[key]);
    else el.innerHTML = attrs[key];
  });
  if (container && position === 'append') container.append(el);
  if (container && position !== 'append') container.prepend(el);
  if (event && handler && typeof handler === 'function') {
    el.addEventListener(event, handler);
  }
  return el;
};
export let inputSearch = null;
export let movieList = null;
export let triggerMode = false;
export const createBlock = () => {
  const container = createElement({
    type: 'div',
    attrs: { class: 'container' },
    container: document.body,
  });
  createElement({
    type: 'h1',
    attrs: { innerHTML: 'Застосунок для пошуку фільмів' },
    container,
  });
  const searchBlock = createElement({
    type: 'div',
    attrs: { class: 'search' },
    container,
  });
  const inputBlock = createElement({
    type: 'div',
    attrs: {
      class: 'search__input',
    },
    container: searchBlock,
  });
  createElement({
    type: 'label',
    attrs: {
      class: 'search__input-label',
      innerHTML: 'Пошук фільмів',
    },
    container: inputBlock,
  });
  inputSearch = createElement({
    type: 'input',
    attrs: {
      class: 'search__input-area',
      placeholder: 'Введіть текст',
    },
    container: inputBlock,
  });
  const chooseBlock = createElement({
    type: 'div',
    attrs: { class: 'search__choose' },
    container: searchBlock,
  });
  createElement({
    type: 'input',
    attrs: {
      class: 'search__checkbox',
      type: 'checkbox',
    },
    container: chooseBlock,
    event: 'click',
    handler: () => (triggerMode = !triggerMode),
  });
  createElement({
    type: 'label',
    attrs: {
      class: 'search__checkbox-label',
      innerHTML: 'Додати фільми до існуючих?',
    },
    container: chooseBlock,
  });
  movieList = createElement({
    type: 'div',
    attrs: { class: 'movies' },
    container,
  });
};
export const clearMovieBlock = (el) => el && (el.innerHTML = '');
export const addMovie = (movie) => {
  const item = createElement({
    type: 'div',
    attrs: { class: 'movie' },
    container: movieList,
  });
  createElement({
    type: 'img',
    attrs: {
      class: 'movie__image',
      src: /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/oops.jpg',
    },
    container: item,
  });
};
export const createStyle = () => {
  createElement({
    type: 'style',
    attrs: {
      innerHTML: `
    *{box-sizing: border-box;}
    .container{
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      max-width:1280px;
      width:100%;
      padding: 15px;
      margin: 0 auto;
      font-size:18px;
    }
    .search{
      margin-bottom:20px;
    }
    .search__input{
      margin-bottom:10px;
    }
    .search__input-label{
      display:block;
      margin-bottom:5px;
    }
    .search__input-area{
      display:block;
      width:100%;
      padding:10px;
      margin-bottom:10px;
      border:1px solid indigo;
      border-radius:3px;
      max-width:300px;
    }
    .search__choose{
      font-size:12px;
    }
    .movies{
      display:grid;
      grid-template-columns: repeat(auto-fill, 226px);
      gap:30px;
    }
    .movie{
      display:flex;
      justify-content:center;
      align-items:center;
    }
    .movie__image{
      width: 100%;
      object-fit: cover;
    }
    img{
      width:240px;
      height:380px;
    }`,
    },
    container: document.head,
  });
};
