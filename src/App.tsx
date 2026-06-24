import {useState} from 'react'
import SearchBar from './components/SearchBar'
import StatsBar from './components/StatsBar'
import SearchResults from './components/SearchResults.tsx'
import LibraryList from './components/LibraryList.tsx'
import type {BookApi} from './types/BookApi.ts'
import type {Book} from './types/Book.ts'


function App() {
  const [Library, setLibrary] = useState<Book[]>([]);
  const [results, setResults] = useState<BookApi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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
      setResults(data.docs);
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
    setLibrary(prev => [...prev, book])
    console.log(Library);

  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-4xl font-bold">Book Tracking App</h1>
        <StatsBar/>
        <SearchBar onSearch={searchBooks}/>
        <SearchResults loadedData={results} addBook={addBook}/>
        <div>
          <LibraryList libraryList={Library}/>
        </div>
      </div>
    </div>
  );
}

export default App
