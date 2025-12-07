export const LoadingSkeleton = ({ count = 3 }) => {
    return (
        <div className="flex flex-wrap items-start justify-start gap-3 my-3">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}
                    className="size-32 md:size-48 bg-gray-800/70 animate-pulse rounded-xl"
                />
            ))}
        </div>
    );
}