import type {BookApi} from '../types/BookApi.ts'
interface SearchResultsProps {
    loadedData: BookApi[];
    onAdd: (bookApi: BookApi) => void;
}

function SearchResults({loadedData, onAdd}: SearchResultsProps) {
    
    if (loadedData.length === 0) {
        return <p>No books found.</p>;
    }

    return (
        <ul>
            {loadedData.map((book) => (
                <li key={book.key}>
                    {book.cover_i ? 
                        (<img
                            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                            alt={book.title}
                        />)
                        : (<p>No cover available</p>)
                    }
                    <p>{book.title}</p>
                    <p>{book.author_name?.[0] ?? "Unknown Author"}</p>
                    <p>{book?.first_publish_year ?? "Unknown Year"}</p>
                    <button onClick={() => onAdd(book)}>Add Book</button>
                </li>
        ))}
        </ul>
    );
}

export default SearchResults