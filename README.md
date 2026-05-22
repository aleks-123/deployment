# Movies CRUD Backend

Simple Express + MongoDB CRUD backend for movies, with one server-rendered view. Ready to deploy on Render.

## Project structure

```
.
├── app.js                       # entry point
├── config.env                   # env vars (not committed)
├── database/
│   └── db.js                    # mongoose connection
├── models/
│   └── movieModel.js
├── controllers/
│   └── movieController.js
├── routes/
│   ├── movieRoutes.js           # JSON API
│   └── viewRoutes.js            # HTML view
└── views/
    └── movies.ejs
```

## Local setup

```bash
npm install
# edit config.env with your real MongoDB URI + password
npm run dev   # or: npm start
```

Open `http://localhost:3000/` to see the rendered movies view.

## Environment variables

`config.env` (local) / Render dashboard (prod):

| Key                 | Notes                                                    |
|---------------------|----------------------------------------------------------|
| `PORT`              | Render sets this automatically                           |
| `DATABASE`          | MongoDB URI with `<PASSWORD>` placeholder                |
| `DATABASE_PASSWORD` | The password to substitute into `<PASSWORD>`             |

## API

Base URL: `/api/v1/movies`

| Method | Path        | Description           |
|--------|-------------|-----------------------|
| GET    | `/`         | List all movies       |
| POST   | `/`         | Create movie          |
| GET    | `/:id`      | Get one movie         |
| PATCH  | `/:id`      | Update movie          |
| DELETE | `/:id`      | Delete movie          |

Example create:

```bash
curl -X POST http://localhost:3000/api/v1/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"Inception","director":"Christopher Nolan","year":2010,"genre":"Sci-Fi","rating":8.8}'
```

## View

`GET /` (and `GET /movies`) renders an HTML page listing all movies.

## Deploy on Render

1. Push this repo to GitHub.
2. In Render: **New → Web Service** and point it at the repo.
3. Build command: `npm install`
4. Start command: `npm start`
5. Environment variables: add `DATABASE` and `DATABASE_PASSWORD`. (Don't set `PORT` — Render provides it.)
6. Whitelist Render outbound IPs in MongoDB Atlas (or allow `0.0.0.0/0` for testing).
# deployment
