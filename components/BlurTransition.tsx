import { motion } from "framer-motion";

export default function BlurTransition(props: { children: string }) {
  const words = props.children.split(" ");

  return (
    <motion.div className=" flex flex-wrap w-full gap-1 transition-all">
      {words.map((word, index) => {
        return (
          <motion.div
            key={index}
            initial={{ filter: "blur(4px)", translateY: "10px", opacity: 0.5 }}
            animate={{ filter: "blur(0px)", translateY: "0px", opacity: 1 }}
            transition={{ duration: index * 0.1 + 0.2 }}
            className=""
          >
            {word}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
