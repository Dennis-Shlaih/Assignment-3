import BookCard from './BookCard.tsx'
import type {Book} from '../types/Book.ts'

interface LibraryListProps {
    libraryList: Book[];
    deleteBook: (id: string) => void;
    changeStatus: (id: string, status: Book["status"]) => void;
    changeRating: (id: string, rating: number) => void;
}

function LibraryList({libraryList, deleteBook, changeStatus, changeRating}: LibraryListProps) {
    if (libraryList.length === 0) {
        return (
            <p className="py-10 text-sm text-slate-500 dark:text-slate-400">
            Your library is empty, or nothing matches this filter.
            </p>
        );
    }

    return (
        <div>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {libraryList.map((book) => (
                <li key={book.id}>
                <BookCard book={book} onDelete={deleteBook} onChangeStatus={changeStatus} onChangeRating={changeRating} />
                </li>
            ))}
            </ul>
        </div>
    );
}

export default LibraryList;