import BookCard from './BookCard.tsx'
import type {Book} from '../types/Book.ts'

interface LibraryListProps {
    libraryList: Book[]
    deleteBook: (id: string) => void
    changeStatus: (id: string, status: Book["status"]) => void
    changeRating: (id: string, rating: number) => void
}

function LibraryList({libraryList, deleteBook, changeStatus, changeRating}: LibraryListProps) {
    if (libraryList.length === 0) {
        return <p>Your library is empty or no books match the selected filter.</p>;
    }
    return (
        <div>
            <ul>
            {libraryList.map((book) => (
                <li key={book.id}>
                    <BookCard book={book} onDelete={deleteBook} onChangeStatus={changeStatus} onChangeRating={changeRating}/>
                </li>
            ))}
        </ul>
        </div>

    );
}

export default LibraryList;