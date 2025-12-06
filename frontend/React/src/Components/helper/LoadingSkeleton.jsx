export const LoadingSkeleton = ({ count = 3 }) => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3 my-3">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="size-40 md:size-52 bg-gray-700 animate-pulse rounded-xl"
                />
            ))}
        </div>
    );
}