## Book Store API

Simple Express + PostgreSQL API for managing books and authors.

## What This Project Is

This is a small REST API backend for a book store. It is focused on CRUD operations for books and authors, with a PostgreSQL database and a clean folder structure for routes, controllers, and models.

## Tech Stack

- Node.js + Express
- PostgreSQL
- Drizzle ORM + Drizzle Kit
- dotenv for environment configuration

## Prerequisites

- Node.js 20+ and npm
- PostgreSQL 17+ (or Docker)

## Install Dependencies

```bash
npm install
```

## Database Setup

### Option A: Docker (recommended)

```bash
docker compose up -d
```

This starts PostgreSQL with:

- database: `book_store`
- user: `admin`
- password: `postgre`

### Option B: Local PostgreSQL

Create a database and user that match your local setup. The app uses a single connection string in `DATABASE_URL`.

## Environment Variables

Create a .env file in the root directory and add the following:

```bash
DATABASE_URL=postgres://admin:postgre@localhost:5432/book_store
```

## Run the App

```bash
npm start
```

The server uses `node --watch` and will restart on file changes.

The API listens on port `8000` by default.

## Drizzle Notes

The project uses Drizzle ORM and expects `DATABASE_URL` to be set. If you add migrations later, keep them under `drizzle/` and update `drizzle.config.js` as needed.

## API Endpoints

Base URL: `http://localhost:8000`

### Books

- `GET /books` - list all books
- `GET /books?search=term` - full-text search by title
- `GET /books/:id` - get one book (includes author via join)
- `POST /books` - create a book
- `DELETE /books/:id` - delete a book

### Authors

- `GET /author` - list all authors
- `GET /author/:id` - get one author
- `POST /author` - create an author
- `GET /author/:id/books` - list books for an author
- `DELETE /author/:id` - delete (currently mapped to book delete in code)

## Example Requests

```bash
curl http://localhost:8000/books
curl "http://localhost:8000/books?search=harry"

curl -X POST http://localhost:8000/author \
	-H "Content-Type: application/json" \
	-d '{"firstname":"J.K.","lastname":"Rowling","email":"jk@example.com"}'

curl -X POST http://localhost:8000/books \
	-H "Content-Type: application/json" \
	-d '{"title":"HP1","description":"Book 1","author_id":"<uuid>"}'
```

## Common Commands

```bash
npm start
docker compose up -d
docker compose down
```

## Project Structure (high level)

- `index.js`: app entry
- `controllers/`: request handlers
- `Routes/`: route definitions
- `models/`: DB models
- `db/`: database client
- `middleware/`: custom middleware (request logging)
- `log.txt`: request logs written by middleware

## Where To Add New Files

- New routes: add to `Routes/` and then wire them in `index.js`
- New controllers: add to `controllers/`
- New models: add to `models/`
- Middleware: add to `middleware/`
- Database helpers: add to `db/`

## Notes On Search

`GET /books?search=term` uses PostgreSQL full-text search with a GIN index on `books.title`. This is faster than a plain `ILIKE` scan for large datasets.
