const statusEl = document.getElementById("axios-status");
const gridEl = document.getElementById("axios-grid");

async function loadMovies() {
  try {
    const res = await axios.get("/api/v1/movies");
    const movies = res.data.data.movies;

    if (movies.length === 0) {
      statusEl.textContent = "axios OK — no movies in DB yet.";
      return;
    }

    statusEl.textContent = "axios OK — " + movies.length + " movie(s):";

    gridEl.innerHTML = movies
      .map(function (m) {
        const meta = [
          m.year || "",
          m.genre || "",
          m.imbdRating != null ? "IMDb " + m.imbdRating : "",
        ]
          .filter(Boolean)
          .join(" · ");

        return (
          '<div class="card">' +
          "<h3>" + (m.title || "Untitled") + "</h3>" +
          '<div class="meta">' + meta + "</div>" +
          "</div>"
        );
      })
      .join("");
  } catch (err) {
    statusEl.className = "error";
    statusEl.textContent = "axios error: " + err.message;
    console.error(err);
  }
}

loadMovies();
