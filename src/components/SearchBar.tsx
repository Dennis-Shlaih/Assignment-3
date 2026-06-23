import {useState} from 'react'
interface SearchBarProps {
    onSearch: (query: string) => void
}

function SearchBar({onSearch}: SearchBarProps ) {
    const [text, setText] = useState('')
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (text.trim() === "") return;
        onSearch(text);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search Books"
                className="w-full rounded border p-2"
            />
            <button type="submit">Search Book</button>
        </form>
    );
}

export default SearchBar;