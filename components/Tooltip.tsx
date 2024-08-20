import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function Tooltip(props: {
  children: any
  label: string
  className?: string
  id: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-block w-full"
    >
      <button className={props.className}>{props.label}</button>

      <AnimatePresence>
        {hovered && (
          <motion.div
            layoutId={props.id}
            animate={{ scale: [0.9, 1.01, 1], opacity: [0, 1] }}
            initial={{ opacity: 0, x: 2 }}
            exit={{ opacity: 0, x: 2 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="absolute left-full top-0 z-10 ml-2 -translate-y-1/2 rounded-lg bg-gray-200 p-1 px-3 whitespace-nowrap"
          >
            <p className="text-[14px]">{props.children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
