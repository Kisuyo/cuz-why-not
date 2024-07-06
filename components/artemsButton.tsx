import { useEffect, useState, useMemo } from "react"

export default function ArtemsButton() {
  const [conicDegree, setConicDegree] = useState(180)

  const backgroundGradient = useMemo(() => {
    const adjustedStart = (93 - (conicDegree / 360) * 100 + 100) % 100
    const adjustedEnd = (97 - (conicDegree / 360) * 100 + 100) % 100

    return `conic-gradient(
      from ${conicDegree}deg at 50% 0%,
      #98f5fc 0%,
      rgba(152,245,252,0.48) 3%,
      rgba(72,171,224,0) 8%,
      rgba(72,171,224,0) ${adjustedStart}%,
      rgba(152,245,252,0.48) 97%,
      #98f5fc 100%
    )`
  }, [conicDegree])

  useEffect(() => {
    const interval = setInterval(() => {
      setConicDegree((prevDegree) => {
        const newDegree = prevDegree + 1
        const result = newDegree > 360 ? 0 : newDegree

        return result
      })
    }, 1)

    return () => clearInterval(interval)
  }, [])

  return (
    <button
      className="next-step-button z-[10] w-[130px] h-[50px] bg-[#0066cc] text-white relative overflow-hidden group"
      style={{
        transform: "skew(0deg, -6deg)",
        borderRadius: "14px 4px 14px 4px",
        fontSize: "20px",
      }}
    >
      <div
        className={`w-full scale-[1] scale-x-[2] z-[20] absolute top-[-12%] h-[200px] right-[-25%]`}
        style={{
          background: backgroundGradient,
        }}
      ></div>

      <div className="z-[30] relative">next step</div>
    </button>
  )
}
