import { motion } from "motion/react";

export const LoadingSkeleton = ({ count }) => {
    return (
        <div className={`flex flex-wrap items-center justify-center gap-5 md:gap-8 lg:gap-5 my-6`}>
            {Array.from({ length: count }).map((_, index) => (
                <motion.div key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeIn", delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="size-40 md:size-48 xl:size-52 bg-gray-800/70 animate-pulse rounded-xl"
                ></motion.div>
            ))}
        </div>
    );
}