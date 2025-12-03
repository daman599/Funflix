import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";

export const TextGenerateEffect = ({
  words,
  className,
}) => {

  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate("span", {
      opacity: 1,
      filter: "blur(0px)",
      y: 0
    }, {
      duration: 0.8,
      delay: stagger(0.4, { ease: "easeIn" }),
    });
  }, []);

  return (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => {
        return (
          <motion.span
            key={word + idx}
            className={className}
            style={{
              opacity: 0,
              filter: "blur(10px)",
              y: 10
            }}>
            {word}&nbsp;
          </motion.span>
        );
      })}
    </motion.div>
  );
};

