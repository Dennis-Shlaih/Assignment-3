interface StatsBarProps {
    toReadCount: number
    readingCount: number
    finishedCount: number
    averageRating: number
}

function StatsBar({toReadCount, readingCount, finishedCount, averageRating}: StatsBarProps) {
    return (
        <div className="rounded bg-white p-4 shadow">
            <h3>Stats Bar</h3>
            <span>To Read: {toReadCount} </span>
            <span>Reading: {readingCount} </span>
            <span>Finished: {finishedCount} </span>
            <span>Average Rating: {averageRating} </span>
        </div>
    );
}

export default StatsBar;