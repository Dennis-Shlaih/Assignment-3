interface ThemeToggleProps {
    darkMode: boolean;
    toggleTheme: () => void;
}

function ThemeToggle({ darkMode, toggleTheme }: ThemeToggleProps) {
    return (
        <button 
            onClick={toggleTheme}
            className="
                rounded-lg
                bg-slate-800
                px-4
                py-2
                font-medium
                text-white
                transition
                hover:bg-slate-700
                dark:bg-slate-200
                dark:text-slate-900
                dark:hover:bg-slate-300
            "
        >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}
export default ThemeToggle;