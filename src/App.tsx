import {useState} from 'react'
import SearchBar from './components/SearchBar'
import StatsBar from './components/StatsBar'
import SearchResults from './components/SearchResults.tsx'
import LibraryList from './components/LibraryList.tsx'
import type {BookApi} from './types/BookApi.ts'
import type {Book} from './types/Book.ts'


function App() {
  const [library, setLibrary] = useState<Book[]>([]);
  const [results, setResults] = useState<BookApi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | Book["status"]>("all");
  const [sortBy, setSortBy] = useState<"title" | "author" | "date">("title")
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">("ascending") 

  async function searchBooks(query: string) {
    try {
      setResults([]);
      setLoading(true);
      setError(null);
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
    {console.log(rating)}
  }

  const filteredBooks = filter === "all" ? library : 
    library.filter(book => book.status === filter);
  
  function sortBooks(filteredBooks: Book[]): Book[] {
    if (sortOrder === "ascending") {
      if (sortBy === "date") {
        return filteredBooks.sort((a, b) => a.dateAdded - b.dateAdded);
      }
      else if (sortBy === "author") {
        return filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
      }
      return filteredBooks.sort((a, b) => a.title.localeCompare(b.title))
    }
    else {
      if (sortBy === "date") {
        return filteredBooks.sort((a, b) => b.dateAdded - a.dateAdded);
      }
      else if (sortBy === "author") {
        return filteredBooks.sort((a, b) => b.author.localeCompare(a.author));
      }
      return filteredBooks.sort((a, b) => b.title.localeCompare(a.title))
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-4xl font-bold">Book Tracking App</h1>
        <StatsBar 
          toReadCount={toReadCount} 
          readingCount={readingCount} 
          finishedCount={finishedCount} 
          averageRating={averageRating}/>
        <select 
          value = {filter}
          onChange = {(e) => setFilter(e.target.value as "all" | Book["status"])}
        >
          <option value="all">All</option>
          <option value="to-read">To Read</option>
          <option value="reading">Currently Reading</option>
          <option value="finished">Finished Reading</option>
        </select>
        <select 
          value = {sortBy}
          onChange = {(e) => setSortBy(e.target.value as "title" | "author" | "date")}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="date">Date Added</option>
        </select>
        <select 
          value = {sortOrder}
          onChange = {(e) => setSortOrder(e.target.value as "ascending" | "descending")}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
        <div>
          {loading && <p>searching...</p>}
          {error && <p>{error}</p>}
          <LibraryList libraryList={sortedBooks} deleteBook={deleteBook} changeStatus={changeStatus} changeRating={changeRating}/>

        </div>
        <SearchBar onSearch={searchBooks}/>
        <SearchResults loadedData={results} onAdd={addBook}/>
      </div>
    </div>
  );
}

export default App
