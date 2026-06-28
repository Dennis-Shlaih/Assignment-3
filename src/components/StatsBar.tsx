interface StatsBarProps {
    toReadCount: number
    readingCount: number
    finishedCount: number
    averageRating: number
}

function StatsBar({toReadCount, readingCount, finishedCount, averageRating}: StatsBarProps) {
    return (
        <div className="rounded-xl bg-white p-5 shadow-md dark:bg-slate-800">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                    { label: "To Read", value: toReadCount },
                    { label: "Reading", value: readingCount },
                    { label: "Finished", value: finishedCount },
                    { label: "Avg Rating", value: averageRating.toFixed(1) },
                ].map(({ label, value }) => (
                <div key={label} className="text-center">
                    <p className="text-sm text-gray-500 dark:text-slate-400">{label}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
                </div>
                ))}
            </div>
        </div>
    );
}

export default StatsBar;