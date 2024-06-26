import { motion } from "framer-motion";
import { ChangeEvent, useState } from "react";

export default function FancyPlaceholder(props: {
  children: any;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputVariant = {
    blur: { top: "25%", left: "16px" },
    focused: { top: "-60%", left: "0px" },
  };
  return (
    <div className="relative">
      <input
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={(e) => {
          setInputValue(e.target.value);
          setFocused(false);
        }}
        onChange={props.onChange}
        type="text"
        className={
          props.className
            ? props.className
            : "w-full border-2 border-slate-400/20 bg-transparent p-2 outline-none focus:border-slate-400/20 focus:ring-transparent"
        }
      />
      <motion.div
        animate={focused || inputValue ? "focused" : "blur"}
        initial={"blur"}
        transition={{ easings: "easeInOut" }}
        variants={inputVariant}
        className="pointer-events-none absolute opacity-40"
      >
        {props.children}
      </motion.div>
    </div>
  );
}
