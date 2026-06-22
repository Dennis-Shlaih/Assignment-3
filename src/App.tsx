import SearchBar from './components/SearchBar'
import StatsBar from './components/StatsBar'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-4xl font-bold">Book Tracking App</h1>
        <SearchBar/>
        
        <StatsBar/>
      </div>
    </div>
  );
}

export default App
