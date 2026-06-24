import type {Book} from '../types/Book.ts'

interface BookProp {
    book: Book
    onDelete: (id: string) => void
}

function BookCard({book, onDelete}: BookProp) {
    return (
        <div>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>Status: {book.status}</p>
            <button onClick={() => onDelete(book.id)}>Remove Book</button>
        </div>
    );
}

export default BookCard;