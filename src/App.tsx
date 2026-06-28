import {useEffect, useState} from 'react'
import SearchBar from './components/SearchBar'
import StatsBar from './components/StatsBar'
import SearchResults from './components/SearchResults.tsx'
import LibraryList from './components/LibraryList.tsx'
import ThemeToggle from './components/ThemeToggle.tsx'
import type {BookApi} from './types/BookApi.ts'
import type {Book} from './types/Book.ts'

function App() {
  const [library, setLibrary] = useState<Book[]>(() => {
    const raw = localStorage.getItem("library");
    if (!raw) {
      return [];
    }
    try {
      return JSON.parse(raw);
    }
    catch {
      return [];
    }
  });
  
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      return false;
    }
    try {
      return JSON.parse(savedTheme);
    }
    catch {
      return false;
    }
  });

  const [results, setResults] = useState<BookApi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | Book["status"]>("all");
  const [sortBy, setSortBy] = useState<"title" | "author" | "date">("title")
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">("ascending") 
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("library", JSON.stringify(library));
  } ,[library])

  useEffect(() => {
    if (darkMode) {
        document.documentElement.classList.add("dark");
    }
    else {
        document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode])

  async function searchBooks(query: string) {
    try {
      setResults([]);
      setLoading(true);
      setError(null);
      setHasSearched(true)
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setResults(data.docs as BookApi[]);
    }
    catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
    finally {
      setLoading(false);
    }
  }

  function toggleTheme() {
    setDarkMode(prev => !prev)
  }
  
  function addBook(bookApi: BookApi): void {
    const book: Book = {
      id: bookApi.key,
      title: bookApi.title,
      author: bookApi.author_name?.[0] ?? "Unknown Author",
      publishYear: bookApi.first_publish_year,
      coverID: bookApi.cover_i,
      status: "to-read",
      rating: null,
      dateAdded: Date.now()
    }

    if (!library.some(b => b.id === book.id)) {
      setLibrary(prev => [...prev, book])
    } 
    
    else {
      alert("This book is already in your library.")
    }
  }

  function deleteBook(id: string): void {
    setLibrary(prev => prev.filter(book => book.id !== id));
  }

  function changeStatus(id: string, status: Book["status"]): void {
    setLibrary(prev => prev.map(book => book.id === id ? {...book, status} : book));
  }

  function changeRating(id: string, rating: number): void {
    setLibrary(prev => prev.map(book => book.id === id ? {...book, rating} : book ))
  }

  const filteredBooks = filter === "all" ? library : 
    library.filter(book => book.status === filter);
  
  function sortBooks(filteredBooks: Book[]): Book[] {
    if (sortOrder === "ascending") {
      if (sortBy === "date") {
        return [...filteredBooks].sort((a, b) => a.dateAdded - b.dateAdded);
      }
      else if (sortBy === "author") {
        return [...filteredBooks].sort((a, b) => a.author.localeCompare(b.author));
      }
      return [...filteredBooks].sort((a, b) => a.title.localeCompare(b.title));
    }
    else {
      if (sortBy === "date") {
        return [...filteredBooks].sort((a, b) => b.dateAdded - a.dateAdded);
      }
      else if (sortBy === "author") {
        return [...filteredBooks].sort((a, b) => b.author.localeCompare(a.author));
      }
      return [...filteredBooks].sort((a, b) => b.title.localeCompare(a.title));
    }
  }

  const sortedBooks = sortBooks(filteredBooks)
  const toReadCount = library.filter(book => book.status === "to-read").length;
  const readingCount = library.filter(book => book.status === "reading").length;
  const finishedCount = library.filter(book => book.status === "finished").length;
  const ratedBooks = library.filter(book => book.rating !== null);
  const averageRating = ratedBooks.length === 0 ? 0 :
    ratedBooks.reduce((acc, book) => acc + (book.rating ?? 0), 0) / ratedBooks.length


  return (
    <div className="min-h-screen bg-slate-100 p-6 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="mb-6 text-4xl font-bold text-slate-900 dark:text-white">Book Tracker</h1>
          <ThemeToggle
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          />
        </div>
        
        <StatsBar 
          toReadCount={toReadCount} 
          readingCount={readingCount} 
          finishedCount={finishedCount} 
          averageRating={averageRating}/>
        <div className="mb-6 my-5 flex flex-wrap items-center justify-center gap-3">
          <select
            className="
              rounded-lg 
              border 
              border-gray-300 
              bg-white 
              px-3 
              py-2 
              text-sm 
              text-slate-700 
              shadow-sm 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              dark:border-slate-600 
              dark:bg-slate-800 
              dark:text-slate-200" 
            value = {filter}
            onChange = {(e) => setFilter(e.target.value as "all" | Book["status"])}
          >
            <option value="all">All</option>
            <option value="to-read">To Read</option>
            <option value="reading">Currently Reading</option>
            <option value="finished">Finished Reading</option>
          </select>
          
          <select
            className="
              rounded-lg 
              border 
              border-gray-300 
              bg-white 
              px-3 
              py-2 
              text-sm 
              text-slate-700 
              shadow-sm 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              dark:border-slate-600 
              dark:bg-slate-800 
              dark:text-slate-200" 
          value = {sortBy}
          onChange = {(e) => setSortBy(e.target.value as "title" | "author" | "date")}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="date">Date Added</option>
          </select>
          <select
            className="
              rounded-lg 
              border 
              border-gray-300 
              bg-white 
              px-3 
              py-2 
              text-sm 
              text-slate-700 
              shadow-sm 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              dark:border-slate-600 
              dark:bg-slate-800 
              dark:text-slate-200" 
          value = {sortOrder}
          onChange = {(e) => setSortOrder(e.target.value as "ascending" | "descending")}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
        </div>
        
        <div className="my-6">
          {loading && 
            <p className="py-4 text-sm text-slate-500 dark:text-slate-400">Searching...</p>
          }
          {error && 
          <p className="py-4 text-sm text-red-500">{error}</p>
          }
          <LibraryList libraryList={sortedBooks} deleteBook={deleteBook} changeStatus={changeStatus} changeRating={changeRating}/>
        </div>
        <SearchBar onSearch={searchBooks}/>
        <SearchResults loadedData={results} onAdd={addBook} hasSearched={hasSearched}/>
      </div>
    </div>
  );
}

export default App
