import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ToggleSwitch(props: { options?: [string, string] }) {
  const [switchState, setSwitchState] = useState(false);
  const [optionWidth, setOptionWidth] = useState<any>();
  const option1Ref = useRef<any>(null);
  const option2Ref = useRef<any>(null);

  useEffect(() => {
    if (option1Ref.current && !switchState) {
      setOptionWidth(option1Ref.current.offsetWidth);
    }
    if (option2Ref.current && switchState) {
      setOptionWidth(option2Ref.current.offsetWidth);
    }
  }, [switchState]);
  return (
    <div
      className={`w-fit relative min-w-[100px] p-1 flex rounded-full h-[50px] bg-green-200 `}
      onClick={() => {
        setSwitchState(!switchState);
      }}
    >
      <div className="relative h-full w-full items-center z-[99]  flex">
        <motion.div
          layout
          transition={{ easings: "easeInOut" }}
          className={`h-full absolute  z-[10] top-0  rounded-full bg-white ${
            switchState ? "right-0" : "left-0"
          }`}
          style={{ width: props.options ? optionWidth : "50px" }}
        ></motion.div>
        <div
          ref={option1Ref}
          id="option1"
          className="px-3 h-full flex z-[100] items-center"
        >
          {props.options && props.options[0]}
        </div>
        <div
          ref={option2Ref}
          id="option2"
          className="px-3 h-full flex z-[100] items-center"
        >
          {props.options && props.options[1]}
        </div>
      </div>
    </div>
  );
}
