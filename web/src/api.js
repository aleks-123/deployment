import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "") + "/api/v1/movies";

export async function getMovies() {
  const res = await axios.get(API_URL);
  return res.data.data.movies;
}

export async function createMovie(movie) {
  const res = await axios.post(API_URL, movie);
  return res.data.data.movie;
}

export async function deleteMovie(id) {
  await axios.delete(API_URL + "/" + id);
}
