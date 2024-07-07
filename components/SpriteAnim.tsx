import { motion } from "framer-motion"
import { useEffect, useState, useRef, useCallback } from "react"

export default function SpriteAnim() {
  const [coins, setCoins] = useState(0)
  const [pepeEatFrame, setPepeEatFrame] = useState(1)
  const redDotRef = useRef<HTMLDivElement>(null)

  const handleFlyEaten = useCallback(() => {
    setCoins((prevCoins) => prevCoins + 1)
  }, [])

  return (
    <div className="w-[500px]">
      <div className="flex-center text-[24px] font-bold">{coins}</div>
      <div className="relative z-10 overflow-hidden">
        <FlyLineAnim
          redDotRef={redDotRef}
          onFlyEaten={handleFlyEaten}
          pepeEatFrame={pepeEatFrame}
        />
        <PepeEatAnim
          redDotRef={redDotRef}
          pepeEatFrame={pepeEatFrame}
          setPepeEatFrame={setPepeEatFrame}
        />
      </div>
    </div>
  )
}

function FlyLineAnim({
  redDotRef,
  onFlyEaten,
  pepeEatFrame,
}: {
  redDotRef: React.RefObject<HTMLDivElement>
  onFlyEaten: () => void
  pepeEatFrame: number
}) {
  const [, forceUpdate] = useState({})
  const fliesRef = useRef([
    { id: 0, x: 600, isEaten: false },
    { id: 1, x: 700, isEaten: false },
    { id: 2, x: 800, isEaten: false },
    { id: 3, x: 900, isEaten: false },
    { id: 4, x: 1000, isEaten: false },
    { id: 5, x: 1100, isEaten: false },
    { id: 6, x: 1200, isEaten: false },
  ])
  const lastUpdateTimeRef = useRef(performance.now())
  const animationFrameRef = useRef<number | null>(null)

  const updateFlies = (currentTime: number) => {
    const deltaTime = currentTime - lastUpdateTimeRef.current
    lastUpdateTimeRef.current = currentTime

    fliesRef.current = fliesRef.current.map((fly) => ({
      ...fly,
      x: fly.x - 0.2 * deltaTime,
    }))

    fliesRef.current = fliesRef.current.filter(
      (fly) => fly.x > -100 || fly.isEaten
    )

    fliesRef.current = fliesRef.current.map((fly) =>
      fly.isEaten && fly.x <= -100 ? { ...fly, x: 600, isEaten: false } : fly
    )

    while (fliesRef.current.length < 7) {
      fliesRef.current.push({ id: Date.now(), x: 600, isEaten: false })
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
          onFlyEaten={onFlyEaten}
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
  onFlyEaten,
  pepeEatFrame,
  setFlies,
}: {
  id: number
  x: number
  isEaten: boolean
  redDotRef: React.RefObject<HTMLDivElement>
  onFlyEaten: () => void
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
        onFlyEaten()
        setIsAnimatingEaten(true)
        setTimeout(() => setIsAnimatingEaten(false), 1000)
      }
    }
  }, [x, redDotRef, isEaten, pepeEatFrame, onFlyEaten, id, setFlies])

  if (isEaten && !isAnimatingEaten) {
    return null
  }

  return (
    <div
      ref={flyRef}
      className="absolute top-0 z-[100]"
      style={{
        transform: `translateX(${x}px)`,
        transition: "transform 0.008s linear",
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
  pepeEatFrame,
  setPepeEatFrame,
}: {
  redDotRef: React.RefObject<HTMLDivElement>
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
            return prevFrame + 1
          }
        })
      }, 30)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAnimating, setPepeEatFrame])

  return (
    <div
      onClick={() => {
        if (!isAnimating) {
          setPepeEatFrame(1)
          setIsAnimating(true)
        }
      }}
      className="z-10 w-full flex-center"
    >
      <div
        ref={redDotRef}
        className="bg-red-500/0 absolute top-[48px] z-[20] left-[55%] translate-x-[-50%] h-[24px] w-[24px]"
      ></div>
      <img
        src={`/pepe/pepeEat${pepeEatFrame}.png`}
        className="w-[200px] transition-all active:scale-[0.98] z-[40] cursor-pointer"
        alt=""
      />
    </div>
  )
}
