import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"

export default function SpriteAnim() {
  const [isFlyEaten, setIsFlyEaten] = useState(false)
  const [coins, setCoins] = useState(0)
  const [pepeEatFrame, setPepeEatFrame] = useState(1)
  const redDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isFlyEaten) {
      setCoins((prevCoins) => prevCoins + 1)
      setTimeout(() => setIsFlyEaten(false), 1000)
    }
  }, [isFlyEaten])

  return (
    <div>
      <div className="flex-center text-[24px] font-bold">{coins}</div>
      <div className="relative z-10 overflow-hidden">
        <FlyLineAnim
          redDotRef={redDotRef}
          setIsFlyEaten={setIsFlyEaten}
          pepeEatFrame={pepeEatFrame}
        />
        <PepeEatAnim
          redDotRef={redDotRef}
          setIsFlyEaten={setIsFlyEaten}
          pepeEatFrame={pepeEatFrame}
          setPepeEatFrame={setPepeEatFrame}
        />
      </div>
    </div>
  )
}

function FlyLineAnim({
  redDotRef,
  setIsFlyEaten,
  pepeEatFrame,
}: {
  redDotRef: React.RefObject<HTMLDivElement>
  setIsFlyEaten: (value: boolean) => void
  pepeEatFrame: number
}) {
  const [, forceUpdate] = useState({})
  const fliesRef = useRef([
    { id: 0, x: 0, isEaten: false },
    { id: 1, x: -100, isEaten: false },
    { id: 2, x: -200, isEaten: false },
    { id: 3, x: -300, isEaten: false },
    { id: 4, x: -400, isEaten: false },
    { id: 5, x: -500, isEaten: false },
    { id: 6, x: -600, isEaten: false },
  ])
  const lastUpdateTimeRef = useRef(performance.now())
  const animationFrameRef = useRef<number | null>(null)

  const updateFlies = (currentTime: number) => {
    const deltaTime = currentTime - lastUpdateTimeRef.current
    lastUpdateTimeRef.current = currentTime

    fliesRef.current = fliesRef.current.map((fly) => ({
      ...fly,
      x: fly.x + 0.1 * deltaTime,
    }))

    fliesRef.current = fliesRef.current.filter(
      (fly) => fly.x < 600 || fly.isEaten
    )

    // Recycle eaten flies that have moved off-screen
    fliesRef.current = fliesRef.current.map((fly) =>
      fly.isEaten && fly.x >= 600 ? { ...fly, x: -100, isEaten: false } : fly
    )

    while (fliesRef.current.length < 7) {
      fliesRef.current.push({ id: Date.now(), x: -100, isEaten: false })
    }

    forceUpdate({})
    animationFrameRef.current = requestAnimationFrame(updateFlies)
  }

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updateFlies)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const setFlies = (
    updater: (flies: typeof fliesRef.current) => typeof fliesRef.current
  ) => {
    fliesRef.current = updater(fliesRef.current)
    forceUpdate({})
  }

  return (
    <>
      {fliesRef.current.map((fly) => (
        <FlyAnim
          key={fly.id}
          id={fly.id}
          x={fly.x}
          isEaten={fly.isEaten}
          redDotRef={redDotRef}
          setIsFlyEaten={setIsFlyEaten}
          pepeEatFrame={pepeEatFrame}
          setFlies={setFlies}
        />
      ))}
    </>
  )
}

function FlyAnim({
  id,
  x,
  isEaten,
  redDotRef,
  setIsFlyEaten,
  pepeEatFrame,
  setFlies,
}: {
  id: number
  x: number
  isEaten: boolean
  redDotRef: React.RefObject<HTMLDivElement>
  setIsFlyEaten: (value: boolean) => void
  pepeEatFrame: number
  setFlies: (
    updater: (
      flies: Array<{ id: number; x: number; isEaten: boolean }>
    ) => Array<{ id: number; x: number; isEaten: boolean }>
  ) => void
}) {
  const [flyFrame, setFlyFrame] = useState(1)
  const [isInRedBox, setIsInRedBox] = useState(false)
  const [isAnimatingEaten, setIsAnimatingEaten] = useState(false)
  const flyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setFlyFrame((prevFrame) => (prevFrame >= 11 ? 1 : prevFrame + 1))
    }, 120)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (redDotRef.current && flyRef.current) {
      const redDotRect = redDotRef.current.getBoundingClientRect()
      const flyRect = flyRef.current.getBoundingClientRect()

      const newIsInRedBox =
        flyRect.left < redDotRect.right &&
        flyRect.right > redDotRect.left &&
        flyRect.top < redDotRect.bottom &&
        flyRect.bottom > redDotRect.top

      setIsInRedBox(newIsInRedBox)

      if (
        newIsInRedBox &&
        (pepeEatFrame === 7 || pepeEatFrame === 8) &&
        !isEaten
      ) {
        setFlies((prevFlies) =>
          prevFlies.map((fly) =>
            fly.id === id ? { ...fly, isEaten: true } : fly
          )
        )
        setIsFlyEaten(true)
        setIsAnimatingEaten(true)
        setTimeout(() => setIsAnimatingEaten(false), 1000) // Match this with the animation duration
      }
    }
  }, [x, redDotRef, isEaten, pepeEatFrame, setIsFlyEaten, id, setFlies])

  if (isEaten && !isAnimatingEaten) {
    return null // Don't render the fly if it's eaten and not animating
  }

  return (
    <div
      ref={flyRef}
      className="absolute top-0 z-[100]"
      style={{
        transform: `translateX(${x}px)`,
        transition: "transform 0.016s linear",
        opacity: isAnimatingEaten ? 0 : 1,
        ...(isAnimatingEaten && {
          transform: `translateX(${x}px) translateY(200px)`,
          transition: "transform 1s, opacity 1s",
        }),
      }}
    >
      <img src={`/fly/flyFrame${flyFrame}.png`} alt="" className="w-[80px]" />
    </div>
  )
}

function PepeEatAnim({
  redDotRef,
  setIsFlyEaten,
  pepeEatFrame,
  setPepeEatFrame,
}: {
  redDotRef: React.RefObject<HTMLDivElement>
  setIsFlyEaten: (value: boolean) => void
  pepeEatFrame: number
  setPepeEatFrame: React.Dispatch<React.SetStateAction<number>>
}) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isAnimating) {
      interval = setInterval(() => {
        setPepeEatFrame((prevFrame) => {
          if (prevFrame >= 14) {
            setIsAnimating(false)
            return 1
          } else {
            if (prevFrame === 7 || prevFrame === 8) {
              setIsFlyEaten(true)
            }
            return prevFrame + 1
          }
        })
      }, 40)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAnimating, setIsFlyEaten, setPepeEatFrame])

  return (
    <div
      onClick={() => {
        if (!isAnimating) {
          setPepeEatFrame(1)
          setIsAnimating(true)
        }
      }}
      className="z-10"
    >
      <div
        ref={redDotRef}
        className="bg-red-500/20 absolute top-[48px] z-[20] left-[55%] translate-x-[-50%] h-[24px] w-[24px]"
      ></div>
      <img
        src={`/pepe/pepeEat${pepeEatFrame}.png`}
        className="w-[200px] transition-all active:scale-[0.98] z-[40] cursor-pointer"
        alt=""
      />
    </div>
  )
}
