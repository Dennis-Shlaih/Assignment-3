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
    console.log(`Book with ID ${id} status changed to ${status}`);
  }

  const filteredBooks = filter === "all" ? library : 
    library.filter(book => book.status === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-4xl font-bold">Book Tracking App</h1>
        <StatsBar/>
        <select 
          value = {filter}
          onChange = {(e) => setFilter(e.target.value as "all" | Book["status"])}
        >
          <option value="all">All</option>
          <option value="to-read">To Read</option>
          <option value="reading">Currently Reading</option>
          <option value="finished">Finished Reading</option>
        </select>
        <div>
          <LibraryList libraryList={filteredBooks} deleteBook={deleteBook} changeStatus={changeStatus}/>

        </div>
        <SearchBar onSearch={searchBooks}/>
        <SearchResults loadedData={results} onAdd={addBook}/>
      </div>
    </div>
  );
}

export default App
