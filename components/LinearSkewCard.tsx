import { motion } from "framer-motion";
import { useState } from "react";

export default function LinearSkewCard() {
  const [items, setItems] = useState([
    { title: "To Learn", description: "what i want to learn", date: "Nov 1" },
    {
      title: "Learning",
      description: "what im currently learning",
      date: "Oct 24",
    },
    { title: "Learnt", description: "what ive learnt", date: "Sep 15" },
  ]);

  return (
    <div className="w-[400px] relative h-[400px] border border-slate-400/30 rounded-md bg-white overflow-hidden flex items-center justify-center">
      <div className="relative w-full flex translate-y-[25%] h-full">
        {items.slice(0, 3).map((item, index) => {
          return (
            <motion.div
              key={index}
              initial={{
                skewX: "0deg",
                skewY: "-14deg",
                scale: 1 - (items.length - 1 - index) * 0.05,
                opacity: 1 - (items.length - 1 - index) * 0.22,
                translateX: `${index * 54}px`,
              }}
              style={{
                position: "absolute",
                perspective: "1000px",
                top: `${index * 25}px`,
                zIndex: items.length + index,
              }}
              whileHover={{ translateY: "-50px", opacity: 1 }}
              transition={{
                easings: "cubic-bezier(.77, 0, .175, 1)",
                duration: 0.4,
              }}
              className="group cursor-pointer h-[120px] flex flex-col justify-between w-full ml-[10px] bg-neutral-200/20 backdrop-blur-[8px] border-2 drop-shadow-lg border-slate-400/20 p-3 rounded-[11px]"
            >
              <div
                className={`opacity-60 tracking-wider group-hover:opacity-1 group-hover:text-green-600/80 font-bold duration-500 transition-all`}
              >
                {item.title}
              </div>
              <div className="font-bold tracking-wider opacity-30">
                {item.description}
              </div>
              <div className="opacity-60 text-[12px] font-light">
                {item.date}
              </div>
            </motion.div>
          );
        })}
      </div>
      <div
        className="absolute top-0 right-0 w-[50%] h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 100%)",
        }}
      ></div>
    </div>
  );
}
