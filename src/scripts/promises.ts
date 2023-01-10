import { Movie } from './utils/MovieInterface';

interface MovieResponse {
  data?: Movie;
  errors?: Array<{ message: string }>;
}

interface MoviesResponse {
  data?: Movie[];
  errors?: Array<{ message: string }>;
}

const apiKey =
  'f058267ef11902eaebc3a6ad2cc6080df058267ef11902eaebc3a6ad2cc6080d';

export async function getMovie(id: string): Promise<MovieResponse> {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  const response = await fetch(url);
  const data: Promise<MovieResponse> = await response.json();
  return data;
}

export async function getPopularMovies(): Promise<MoviesResponse> {
  const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
  const response = await fetch(url);
  const data: Promise<MoviesResponse> = await response.json();
  return data;
}

export async function getTopMoviesIds(n = 3) {
  // return getPopularMovies().then(popularMovies =>
  //   popularMovies.slice(0, n).map(movie => movie.id)
  // );
  // try {
  //   const popularMovies = await getPopularMovies();
  // } catch (error) {
  //   console.log(error.message)
  // }

  const popularMovies = await getPopularMovies();
  const ids = popularMovies.data?.slice(0, n).map(movie => movie.id);
  return ids;
}

function renderMovies(movies) {
  const movieList = document.getElementById('movies');
  movieList.innerHTML = '';

  movies.forEach(movie => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" />
      <h5>${movie.title}</h5>
      <p>Released on <em>${movie.release_date}</em></p>
      `;

    movieList.appendChild(listItem);
  });
}

export async function getTopMoviesInSequence() {
  const ids = await getTopMoviesIds();
  const movies = [];

  for (const id of ids) {
    const movie = await getMovie(id);
    movies.push(movie);
  }

  return movies;
}

export async function getTopMoviesInParallel() {
  const ids = await getTopMoviesIds();
  const moviePromises = ids.map(id => getMovie(id));

  const movies = await Promise.all(moviePromises);

  return movies;
}

export async function getFastestTopMovie() {
  const ids = await getTopMoviesIds();
  const moviePromises = ids.map(id => getMovie(id));

  const movie = await Promise.race(moviePromises);
  return movie;
}

document.getElementById('sequence').onclick = async function () {
  const movies = await getTopMoviesInSequence();
  renderMovies(movies);
};

document.getElementById('parallel').onclick = async function () {
  const movies = await getTopMoviesInParallel();
  renderMovies(movies);
};

document.getElementById('fastest').onclick = async function () {
  const movie = await getFastestTopMovie();
  renderMovies([movie]);
};
