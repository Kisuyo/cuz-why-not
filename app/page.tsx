"use client"

import ArrayOrder from "@/components/ArrayOrder"
import Icons from "@/components/Icons"
import Note from "@/components/Note"
import NoteWrapper from "@/components/NoteWrapper"
import SexyTextAnim from "@/components/SexyTextAnim"
import SpriteAnim from "@/components/SpriteAnim"
import Tooltip from "@/components/Tooltip"
import ArtemsButton from "@/components/artemsButton"
import Dashboard from "@/components/routes/Dashboard"

import SlideLandingPage from "@/components/routes/SlideLandingPage"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function Home() {
  const [items, setItems] = useState(["test", "test2", "test3"])

  return (
    <>
      <div className="w-screen relative h-screen flex-center">
        <NoteWrapper />
      </div>
    </>
  )
}
