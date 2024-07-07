import { motion } from "framer-motion"

export default function SexyTextAnim(props: { text: string; size: number }) {
  switch (props.text) {
    case "K":
      return <LetterK size={props.size} />
  }
}

function LetterK(props: { size: number }) {
  const heightRatio = 124 / 170 // The ratio of height to font size
  const widthRatio = 27 / 170 // The ratio of width to font size
  const topRatio = 65 / 170 // The ratio of top position to font size
  const leftRatio = 10 / 170 // The ratio of left position to font size

  const height = Math.round(props.size * heightRatio)
  const width = Math.round(props.size * widthRatio)
  const top = Math.round(props.size * topRatio)
  const left = Math.round(props.size * leftRatio)

  // Dynamic calculations for the rhombuses
  const rhombusHeightRatio = (124 - 60) / 170
  const rhombusHeight = Math.round(props.size * rhombusHeightRatio)
  const rhombusWidthRatio1 = (27 + 24) / 170
  const rhombusWidth1 = Math.round(props.size * rhombusWidthRatio1)
  const rhombusWidthRatio2 = (27 + 10) / 170
  const rhombusWidth2 = Math.round(props.size * rhombusWidthRatio2)
  const rhombusTopOffset1 = 5 / 170
  const rhombusTopOffset2 = 60 / 170
  const rhombusLeftOffset1 = 24 / 170
  const rhombusLeftOffset2 = 36 / 170

  return (
    <div
      className={`relative font-bold text-transparent`}
      style={{
        fontSize: `${props.size}px`,
      }}
    >
      K
      <motion.div
        animate={{ height: [0, height] }}
        transition={{ duration: 0.8, easings: "easeOut" }}
        className="absolute bg-green-600"
        style={{
          top: `${top}px`,
          left: `${left}px`,
          height: `${height}px`,
          width: `${width}px`,
        }}
      ></motion.div>
      <motion.div
        initial={{
          height: 0,
          top: `${
            top + Math.round(props.size * rhombusTopOffset1) + rhombusHeight
          }px`,
        }}
        animate={{
          height: rhombusHeight,
          top: `${top + Math.round(props.size * rhombusTopOffset1)}px`,
        }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="absolute  bg-green-600"
        style={{
          transform: "skew(-30deg, -30deg) rotate(30deg)",
          left: `${left + Math.round(props.size * rhombusLeftOffset1)}px`,
          width: `${rhombusWidth1}px`,
        }}
      ></motion.div>
      <motion.div
        initial={{
          height: 0,
          top: `${
            top + Math.round(props.size * rhombusTopOffset2) + rhombusHeight
          }px`,
        }}
        animate={{
          height: rhombusHeight,
          top: `${top + Math.round(props.size * rhombusTopOffset2)}px`,
        }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
        className="absolute  bg-green-600"
        style={{
          transform: "skew(20deg, 20deg) rotate(-20deg)",
          left: `${left + Math.round(props.size * rhombusLeftOffset2)}px`,
          width: `${rhombusWidth2}px`,
        }}
      ></motion.div>
    </div>
  )
}
