import {useState} from 'react'
import SearchBar from './components/SearchBar'
import StatsBar from './components/StatsBar'
import SearchResults from './components/SearchResults.tsx'
import type {BookApi} from './types/BookApi.ts'

function App() {
  const [results, setResults] = useState<BookApi[]>([])
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
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-4xl font-bold">Book Tracking App</h1>
        <StatsBar/>
        <SearchBar onSearch={searchBooks}/>
        <SearchResults loadedData={results}/>
        <div>
        </div>
      </div>
    </div>
  );
}

export default App
