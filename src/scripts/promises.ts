import { Movie } from './utils/MovieInterface';

export interface HTTPError {
  status_message: string;
  status_code: number;
}

interface Response {
  errors?: HTTPError | unknown;
}

interface MovieResponse extends Response {
  data?: Movie;
}

interface MoviesResponse extends Response {
  results?: Movie[];
}

const apiKey =
  'f058267ef11902eaebc3a6ad2cc6080d';

const sequenceBtn = document.getElementById('sequence') as HTMLButtonElement; 
const parallelBtn = document.getElementById('parallel') as HTMLButtonElement; 
const fastestBtn = document.getElementById('fastest') as HTMLButtonElement;

sequenceBtn.onclick = async function () {
  const movies = await getTopMoviesInSequence() as Movie[];
  console.log(Array.isArray(movies))
  renderMovies(movies);
};

parallelBtn.onclick = async function () {
  const movies = await getTopMoviesInParallel() as Movie[];
  renderMovies(movies);
};

fastestBtn.onclick = async function () {
  const movie = await getFastestTopMovie() as Movie;
  renderMovies([movie]);
};

function renderMovies(movies: Movie[]) {
  const movieList = document.getElementById('movies') as HTMLUListElement;
  movieList.innerHTML = '';

  console.log('movies', movies)

  movies.forEach((movie) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" />
      <h5>${movie.title}</h5>
      <p>Released on <em>${movie.release_date}</em></p>
    `;

    movieList.appendChild(listItem);
  });
}

// API CALLS

export async function getMovie(id: string): Promise<MovieResponse> {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  const response = await fetch(url);
  const data: MovieResponse = await response.json();
  return data
}

export async function getPopularMovies(): Promise<MoviesResponse> {
  const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
  const response = await fetch(url);
  const data: Promise<MoviesResponse> = await response.json();
  return data;
}

export async function getTopMoviesIds(n = 3) {
  const popularMovies = await getPopularMovies();
  const ids = popularMovies.results?.slice(0, n).map(movie => movie.id.toString());
  return ids;
}

export async function getTopMoviesInSequence() {
  const ids = await getTopMoviesIds() || [];
  const movies = []
  for (const id of ids) {
    const movie = await getMovie(id);
    movies.push(movie);
  }
  return movies;
}

export async function getTopMoviesInParallel() {
  const ids = await getTopMoviesIds();
  const moviePromises = ids?.map(id => getMovie(id)) || [];
  const movies = await Promise.all(moviePromises);

  return movies;
}

export async function getFastestTopMovie() {
  const ids = await getTopMoviesIds();
  const moviePromises = ids?.map(id => getMovie(id)) || [];
  const movie = await Promise.race(moviePromises);

  return movie;
}