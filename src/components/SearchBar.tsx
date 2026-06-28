import {useState} from 'react'
interface SearchBarProps {
    onSearch: (query: string) => void;
}

function SearchBar({onSearch}: SearchBarProps ) {
    const [text, setText] = useState('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (text.trim() === "") return;
        onSearch(text);
    }

    return (
        <form className="flex gap-3" onSubmit={handleSubmit}>
            <input 
              className="
                flex-1
                rounded-lg
                border
                border-gray-300
                px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                dark:text-white
                dark:bg-slate-800
                dark:border-slate-600
                "
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Search Books"
            />
            <button
            className="
                rounded-lg
                bg-blue-600
                px-5
                py-2
                font-medium
                text-white
                transition
                hover:bg-blue-700
                " 
            type="submit">Search Book</button>
        </form>
    );
}

export default SearchBar;