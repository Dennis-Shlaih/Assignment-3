import BookCard from './BookCard.tsx'
import type {Book} from '../types/Book.ts'

interface LibraryListProps {
    libraryList: Book[]
}

function LibraryList({libraryList}: LibraryListProps) {
    return (
        <ul>
            {libraryList.map((book) =>
            <BookCard key={book.id} book={book}/>)}
        </ul>
    );
}

export default LibraryList;