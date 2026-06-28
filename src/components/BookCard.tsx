import type {Book} from '../types/Book.ts'

interface BookProp {
    book: Book
    onDelete: (id: string) => void
    onChangeStatus: (id: string, status: Book["status"]) => void
    onChangeRating: (id: string, status: number) => void
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

function BookCard({book, onDelete, onChangeStatus, onChangeRating}: BookProp) {
    const canGoBackward = book.status !== "to-read" ? true : false;
    const canGoForward = book.status !== "finished" ? true : false;
    
    return (
        <div className="flex h-full flex-col rounded-xl bg-white p-5 shadow transition hover:shadow-lg dark:bg-slate-800">
            <img
            className="mx-auto h-48 w-auto rounded object-cover"
            src={`https://covers.openlibrary.org/b/id/${book.coverID}-M.jpg`}
            alt={book.title}
            />
            <div className="mt-3 flex-1 text-left">
            <h2 className="text-base font-semibold leading-snug text-slate-900 dark:text-white">{book.title}</h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{book.author}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">{book?.publishYear ?? "Unknown year"}</p>
            </div>

            <div className="mt-3">
            <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                book.status === "to-read"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                : book.status === "reading"
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            }`}>
                {renderStatus(book.status)}
            </span>
            </div>

            {book.status === "finished" && (
            <div className="mt-2 flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => onChangeRating(book.id, star)}
                    className={`text-xl transition ${
                    star <= (book.rating ?? 0) ? "text-amber-400" : "text-slate-300 dark:text-slate-600"
                    } hover:text-amber-400`}
                >
                    {star <= (book.rating ?? 0) ? "★" : "☆"}
                </button>
                ))}
            </div>
            )}

            <div className="mt-4 flex gap-2">
            {canGoBackward && (
                <button
                onClick={() => onChangeStatus(book.id, previousStatus(book.status))}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                ← Back
                </button>
            )}
            {canGoForward && (
                <button
                onClick={() => onChangeStatus(book.id, nextStatus(book.status))}
                className="flex-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
                >
                Next →
                </button>
            )}
            </div>

            <button
            onClick={() => onDelete(book.id)}
            className="mt-2 w-full rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-500 transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
            >
            Remove
            </button>
        </div>
        );
}

export default BookCard;