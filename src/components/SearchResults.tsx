import type {BookApi} from '../types/BookApi.ts'

interface SearchResultsProps {
    loadedData: BookApi[];
}

function SearchResults({loadedData}: SearchResultsProps) {
    
    if (loadedData.length === 0) {
        return <p>No books found.</p>;
    }

    return (
        <ul>
            {loadedData.map((book) => (
                <li key={book.key}>
                    <p>{book.title}</p>
                    <p>{book.author_name?.[0] ?? "Unknown Author"}</p>
                    {book.cover_i ? 
                        (<img
                            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                            alt={book.title}
                        />)
                        : (<p>No cover available</p>)
                    }
                    <p>{book.first_publish_year}</p>
                    
                </li>
        ))}
        </ul>
    );
}

export default SearchResults