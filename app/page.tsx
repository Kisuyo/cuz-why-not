"use client"

import ArtemsButton from "@/components/artemsButton"
import { useEffect, useState } from "react"

export default function Home() {
  const [activateFlare, setActivateFlare] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivateFlare((prevState) => !prevState)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="flex-center w-screen h-screen bg-black">
        <ArtemsButton />
      </div>
    </>
  )
}
