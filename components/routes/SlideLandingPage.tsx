import { motion, useAnimationFrame, useMotionValue } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function SlideLandingPage() {
  const [adjectives, setAdjectives] = useState([
    "KINETIC",
    "UNYIELDING",
    "INTREPID",
    "OTIOSE",
    "ATHLETIC",
    "ARGUMENTATIVE",
    "SAGACIOUS",
    "ERUDITE",
    "VIGILANTE",
  ])
  const [duplicatedAdjectives, setDuplicatedAdjectives] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const container2Ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const x2 = useMotionValue(0)
  const [highlightedLetters, setHighlightedLetters] = useState<string>("")

  useEffect(() => {
    setDuplicatedAdjectives([...adjectives, ...adjectives])
  }, [adjectives])

  const checkOverlap = (
    containerRef: React.RefObject<HTMLDivElement>,
    xValue: number
  ) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const spans = containerRef.current.querySelectorAll("span")
      const centerX = window.innerWidth / 2

      spans.forEach((span) => {
        const spanRect = span.getBoundingClientRect()
        const spanCenterX = (spanRect.left + spanRect.right) / 2
        const distanceFromCenter = Math.abs(spanCenterX - centerX)

        if (distanceFromCenter < 50) {
          // Adjust this value to change sensitivity
          const letter = span.textContent?.[0]
          if (letter && "KISUYO".includes(letter)) {
            setHighlightedLetters((prev) => {
              if (!prev.includes(letter)) {
                return prev + letter
              }
              return prev
            })
          }
        }
      })
    }
  }

  useAnimationFrame((t) => {
    if (containerRef.current) {
      const xValue = x.get()
      const contentWidth = containerRef.current.scrollWidth / 2

      if (xValue <= -contentWidth) {
        x.set(0)
      } else {
        x.set(xValue - 1)
      }
      checkOverlap(containerRef, xValue)
    }
  })

  useAnimationFrame((t) => {
    if (container2Ref.current) {
      const xValue = x2.get()
      const contentWidth = container2Ref.current.scrollWidth / 2

      if (xValue >= 0) {
        x2.set(-contentWidth)
      } else {
        x2.set(xValue + 1)
      }
      checkOverlap(container2Ref, xValue)
    }
  })

  return (
    <div className="h-screen relative bg-neutral-950 w-screen overflow-hidden flex flex-col gap-4 p-4 px-0">
      <div className="w-full flex items-center bg-[#101010] h-[33%]">
        <motion.div
          ref={containerRef}
          style={{ x }}
          className="flex whitespace-nowrap"
        >
          {duplicatedAdjectives.map((adj, index) => (
            <span
              key={index}
              className={`mx-4 text-[280px] tracking-tight font-black ${
                index % 2 === 0 ? "text-white" : "text-green-500"
              }`}
            >
              {adj}
            </span>
          ))}
        </motion.div>
      </div>
      <div className="w-full h-[33%] bg-[#101010] flex-center font-black text-[280px] text-white">
        {"KISUYO".split("").map((letter, index) => (
          <span
            key={index}
            className={
              highlightedLetters.includes(letter)
                ? "text-green-500"
                : "text-white"
            }
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="w-full h-[33%] bg-[#101010] items-center flex">
        <motion.div
          ref={container2Ref}
          style={{ x: x2 }}
          className="flex whitespace-nowrap"
        >
          {duplicatedAdjectives.map((adj, index) => (
            <span
              key={index}
              className={`mx-4 text-[280px] tracking-tight font-black ${
                index % 2 === 0 ? "text-white" : "text-green-500"
              }`}
            >
              {adj}
            </span>
          ))}
        </motion.div>
      </div>
      <About />
    </div>
  )
}

function About() {
  return (
    <motion.div
      initial={{ rotate: "-45deg" }}
      animate={{ scaleX: [0, 1] }}
      transition={{ duration: 1 }}
      className="absolute bottom-[50%] bg-white rotate-[-45deg] w-[1600px] h-[700px] right-[50%] translate-x-[50%] translate-y-[50%] flex-center"
    >
      <div>hi</div>
      <motion.div
        animate={{}}
        className="bg-transparent absolute top-0 left-0 border-t-[4px] border-orange-500 w-[1600px] h-full"
      ></motion.div>
      <motion.div className="bg-transparent absolute top-0 left-0 border-b-[4px] border-orange-500 w-[1600px] h-full"></motion.div>
    </motion.div>
  )
}
