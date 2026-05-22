import { useEffect, useState } from "react";
import { getMovies, createMovie, deleteMovie } from "./api";

const GENRES = ["Action", "Comedy", "Drama", "Fantasy"];
const EMPTY_FORM = { title: "", year: "", genre: "Action", imbdRating: "" };

export default function App() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setMovies(await getMovies());
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        title: form.title.trim(),
        genre: form.genre,
      };
      if (form.year) payload.year = Number(form.year);
      if (form.imbdRating) payload.imbdRating = Number(form.imbdRating);

      await createMovie(payload);
      setForm(EMPTY_FORM);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this movie?")) return;
    try {
      await deleteMovie(id);
      setMovies(movies.filter((m) => m._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Movies</h1>
        <p className="subtitle">React + Vite frontend · talking to Express/Mongo backend via axios</p>
      </header>

      <section className="panel">
        <h2>Add a movie</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            name="year"
            type="number"
            placeholder="Year"
            min="1800"
            max={new Date().getFullYear()}
            value={form.year}
            onChange={handleChange}
          />
          <select name="genre" value={form.genre} onChange={handleChange}>
            {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          <input
            name="imbdRating"
            type="number"
            step="0.1"
            min="0"
            max="10"
            placeholder="IMDb rating"
            value={form.imbdRating}
            onChange={handleChange}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Saving…" : "Add movie"}
          </button>
        </form>
      </section>

      {error && <div className="error">⚠ {error}</div>}

      <section className="panel">
        <div className="panel-head">
          <h2>All movies {movies.length > 0 && <span className="count">({movies.length})</span>}</h2>
          <button className="ghost" onClick={load} disabled={loading}>
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>

        {loading && movies.length === 0 ? (
          <p className="muted">Loading…</p>
        ) : movies.length === 0 ? (
          <p className="muted">No movies yet. Add one above.</p>
        ) : (
          <div className="grid">
            {movies.map((m) => (
              <article key={m._id} className="card">
                <h3>{m.title}</h3>
                <div className="meta">
                  {[m.year, m.genre, m.imbdRating != null ? `IMDb ${m.imbdRating}` : null]
                    .filter(Boolean)
                    .join(" · ")}
                </div>
                <button className="danger" onClick={() => handleDelete(m._id)}>Delete</button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
