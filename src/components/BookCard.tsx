import type {Book} from '../types/Book.ts'

interface BookProp {
    book: Book
}

function BookCard({book}: BookProp) {
    return (
        <div>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>Status: {book.status}</p>
        </div>
    );
}

export default BookCard;