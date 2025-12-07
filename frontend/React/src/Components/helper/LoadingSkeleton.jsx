export const LoadingSkeleton = ({ count = 3 }) => {
    return (
        <div className={`flex flex-wrap items-center md:items-start justify-center md:justify-start gap-5 md:gap-8 lg:gap-5 my-6`}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}
                    className="size-40 md:size-48 xl:size-52 bg-gray-800/70 animate-pulse rounded-xl"
                />
            ))}
        </div>
    );
}