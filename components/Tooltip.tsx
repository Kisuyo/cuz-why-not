import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Tooltip(props: {
  children: any;
  label: string;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-fit"
    >
      <p className={props.className}>{props.label}</p>

      <AnimatePresence>
        {hovered && (
          <motion.div
            animate={{ scale: [0.9, 1.01, 1], opacity: [0, 1] }}
            initial={{ translateX: "-50%" }}
            exit={{ opacity: 0 }}
            transition={{ easings: "easeOut", duration: 0.2 }}
            className="absolute left-1/2 top-full z-10 mt-2 transform rounded-lg bg-gray-200 p-3"
          >
            <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-[50%] -translate-y-[50%] rotate-45 transform bg-gray-200"></div>
            <p className="w-fit text-[12px]">{props.children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
