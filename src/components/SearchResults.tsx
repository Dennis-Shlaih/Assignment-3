import type {BookApi} from '../types/BookApi.ts'

interface SearchResultsProps {
    loadedData: BookApi[];
    onAdd: (bookApi: BookApi) => void;
    hasSearched: boolean
}

function SearchResults({loadedData, onAdd, hasSearched}: SearchResultsProps) {  
    if (!hasSearched) {
        return <p className="py-6 text-sm text-slate-500 dark:text-slate-400">Search for a book to get started!.</p>;
    }
    if (loadedData.length === 0) {
        return <p className="py-6 text-sm text-slate-500 dark:text-slate-400">No books found.</p>;
    }

    return (
        <ul className="mt-6 space-y-3">
            {loadedData.map((book) => (
            <li
                key={book.key}
                className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800"
            >
                {book.cover_i ? (
                <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                    className="h-20 w-14 flex-shrink-0 rounded object-cover"
                />
                ) : (
                <div className="flex h-20 w-14 flex-shrink-0 items-center justify-center rounded bg-slate-200 text-xs text-slate-400 dark:bg-slate-700">
                    No cover
                </div>
                )}
                <div className="min-w-0 flex-1 text-left">
                <p className="truncate font-semibold text-slate-900 dark:text-white">{book.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{book.author_name?.[0] ?? "Unknown Author"}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{book?.first_publish_year ?? "Unknown Year"}</p>
                </div>
                <button
                onClick={() => onAdd(book)}
                className="flex-shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
                >
                Add
                </button>
            </li>
            ))}
        </ul>
    );
}

export default SearchResults