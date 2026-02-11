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

## Drizzle Notes

The project uses Drizzle ORM and expects `DATABASE_URL` to be set. If you add migrations later, keep them under `drizzle/` and update `drizzle.config.js` as needed.

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

## Where To Add New Files

- New routes: add to `Routes/` and then wire them in `index.js`
- New controllers: add to `controllers/`
- New models: add to `models/`
- Middleware: add to `middleware/`
- Database helpers: add to `db/`
