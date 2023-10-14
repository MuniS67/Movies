import { movies } from "./db.js";

let ul = document.querySelector(".promo__interactive-list");
let promo_bg = document.querySelector(".promo__bg");
let inp_search = document.querySelector("#search");
let promo__genre = document.querySelector(".promo__genre");
let promo__title = document.querySelector(".promo__title");
let promo__descr = document.querySelector(".promo__descr");
let promo__ratings = document.querySelector(".promo__ratings span");
let starValue = document.querySelector(".own__value");

inp_search.onkeyup = () => {
  let val = inp_search.value.toLowerCase().trim();

  let filtered = movies.filter((item) => {
    let title = item.Title.toLowerCase().trim();

    if (title.includes(val)) {
      return item;
    }
  });

  reload(filtered);
};

let genres = movies.map((item) => item.Genre);
genres = ["All", ...new Set(genres)];
let genreNav = document.querySelector(".promo__menu-list");
let genreUl = genreNav.querySelector("ul");

genresReload(genres);
function genresReload(arr) {
  genreUl.innerHTML = "";

  for (let item of arr) {
    let li = document.createElement("li");
    let a = document.createElement("a");

    a.classList.add("promo__menu-item");
    a.innerHTML = item;
    a.href = "#";

    if (arr.indexOf(item) == 0) a.classList.add("promo__menu-item_active");
    genreUl.append(li);
    li.append(a);
  }
}

reload(movies);
function reload(arr) {
  ul.innerHTML = "";

  changeMovie(arr[0]);

  for (let item of arr) {
    let li = document.createElement("li");
    let del = document.createElement("div");

    li.classList.add("promo__interactive-item");
    del.classList.add("delete");

    li.innerHTML = item.Title;

    li.append(del);
    ul.append(li);

    li.onclick = () => {
      changeMovie(item);
      initRatings();
    };
    del.onclick = () => {
      li.remove();
    };
  }
}
function changeMovie(item) {
  promo_bg.style.backgroundImage = `url(${item.Poster})`;
  promo__genre.innerHTML = item.Genre;
  promo__title.innerHTML = item.Title;
  promo__descr.innerHTML =
    item.Plot.length > 130
      ? item.Plot.slice(0, 120) + " <b>...read</b>"
      : item.Plot;
  promo__ratings.innerHTML = `${item.Ratings[0].Source}: ${item.Ratings[0].Value}`;
  starValue.innerHTML = item.Ratings[2].Value.slice(0, 1);
}

const ratings = document.querySelectorAll(".own__rating");
if (ratings.length > 0) {
  initRatings();
}

function initRatings() {
  let ratingActive;
  let ratingValue;

  for (let i = 0; i < ratings.length; i++) {
    const rating = ratings[i];
    initRating(rating);
  }

  function initRating(rating) {
    ratingActive = rating.querySelector(".own__active");
    ratingValue = rating.querySelector(".own__value");

    setRatingActWidth();
  }

  function setRatingActWidth(i = ratingValue.innerHTML) {
    const ratingActWidth = i / 0.1;
    ratingActive.style.width = `${ratingActWidth}%`;
  }
}

let chooseGenres = document.querySelectorAll(".promo__menu-item");
let clickedItem = 0;

chooseGenres.forEach((item, idx) => {
  item.onclick = (e) => {
    e.preventDefault();
    chooseGenres[clickedItem].classList.remove("promo__menu-item_active");
    chooseGenres[idx].classList.add("promo__menu-item_active");

    let genreItem = item.innerHTML.toLowerCase();

    let choosedGenre = movies.filter((movie) => {
      let genre = movie.Genre.toLowerCase();

      if (genre.includes(genreItem)) {
        return movie;
      } else if (genreItem === "all") {
        return movie;
      }
    });
    reload(choosedGenre);
    initRatings();
    clickedItem = idx;
  };
});

function getNumber(max) {
  return Math.floor(Math.random() * max);
}
