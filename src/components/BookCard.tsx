import type {Book} from '../types/Book.ts'

interface BookProp {
    book: Book
    onDelete: (id: string) => void
    onChangeStatus: (id: string, status: Book["status"]) => void
}

function nextStatus(status: Book["status"]): Book["status"] {
    if (status === "to-read") {
        return "reading";
    } 
    if (status === "reading") {
        return "finished";
    }
    return "finished"; 
}

function previousStatus(status: Book["status"]): Book["status"] {
    if (status === "finished") {
        return "reading";
    }
    if (status === "reading") {
        return "to-read";
    }
    return "to-read";
}

function renderStatus(status: Book["status"]): string {
    switch (status) {
        case "to-read":
            return "To Read";
        case "reading":
            return "Reading";
        case "finished":
            return "Finished";
        default:
            return status;
    }
}

function BookCard({book, onDelete, onChangeStatus}: BookProp) {
    const canGoBackward = book.status !== "to-read" ? true : false;
    const canGoForward = book.status !== "finished" ? true : false;
    
    return (
        <div>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book?.publishYear ?? "Unknown Publish Year"}</p>
            <img
                src={`https://covers.openlibrary.org/b/id/${book.coverID}-M.jpg`}
                alt={book.title}
            />
            <p>Status: {renderStatus(book.status)}</p>
            <button onClick={() => onDelete(book.id)}>Remove Book</button>
            {canGoForward && (
                <button onClick={() => onChangeStatus(book.id, nextStatus(book.status))}>
                    Next
                </button>
            )}
            {canGoBackward && (
                <button onClick={() => onChangeStatus(book.id, previousStatus(book.status))}>
                    Back
                </button>
            )}
        </div>
    );
}

export default BookCard;