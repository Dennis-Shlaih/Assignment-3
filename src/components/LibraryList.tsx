import BookCard from './BookCard.tsx'
import type {Book} from '../types/Book.ts'

interface LibraryListProps {
    libraryList: Book[]
    deleteBook: (id: string) => void
    changeStatus: (id: string, status: Book["status"]) => void
}

function LibraryList({libraryList, deleteBook, changeStatus}: LibraryListProps) {
    if (libraryList.length === 0) {
        return <p>Your library is empty.</p>;
    }
    return (
        <div>
            <ul>
            {libraryList.map((book) => (
                <li key={book.id}>
                    <BookCard book={book} onDelete={deleteBook} onChangeStatus={changeStatus}/>
                </li>
            ))}
        </ul>
        </div>

    );
}

export default LibraryList;