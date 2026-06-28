# Book Tracker

A single-page React + TypeScript application for tracking your reading progress.

## Features

- Search books via the Open Library API
- Add books to your personal library
- Move books through a reading pipeline (To Read → Reading → Finished)
- Rate finished books on a 1–5 star scale
- Filter library by status and sort by title, author, or date added
- Stats bar showing live counts and average rating
- Dark mode toggle
- Library and theme preference persisted across page reloads

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Open Library Search API

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── BookCard.tsx
│   ├── LibraryList.tsx
│   ├── SearchBar.tsx
│   ├── SearchResults.tsx
│   ├── StatsBar.tsx
│   └── ThemeToggle.tsx
├── types/
│   ├── Book.ts
│   └── BookApi.ts
└── App.tsx
```