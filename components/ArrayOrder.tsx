import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function ArrayOrder() {
  const [items, setItems] = useState(["hi", "wtf", "lol", "wtft"])
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const dragImageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (dragImageRef.current) {
      dragImageRef.current.style.position = "absolute"
      dragImageRef.current.style.top = "-1000px"
      dragImageRef.current.style.left = "-1000px"
    }
  }, [])

  const onDragStart = (
    e: React.DragEvent<HTMLButtonElement>,
    index: number
  ) => {
    setDraggedItem(items[index])
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", items[index])

    const itemElement = e.currentTarget.closest(".bg-gray-100") as HTMLElement
    if (itemElement && dragImageRef.current) {
      const clone = itemElement.cloneNode(true) as HTMLElement
      clone.style.width = `${itemElement.offsetWidth}px`
      clone.style.height = `${itemElement.offsetHeight}px`
      clone.style.opacity = "0.8"

      dragImageRef.current.innerHTML = ""
      dragImageRef.current.appendChild(clone)

      const rect = e.currentTarget.getBoundingClientRect()
      e.dataTransfer.setDragImage(
        dragImageRef.current,
        rect.width / 2,
        rect.height / 2
      )
    }
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    const draggedOverItem = items[index]

    if (draggedItem === draggedOverItem) {
      return
    }
  }

  const onDragEnd = (e: React.DragEvent<HTMLButtonElement>) => {
    setDraggedItem(null)
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    const newItems = items.filter((item) => item !== draggedItem)
    newItems.splice(index, 0, draggedItem!)
    setItems(newItems)
    setDraggedItem(null)
  }

  return (
    <div className="flex flex-col gap-1 w-[600px]">
      <div ref={dragImageRef} className="opacity-80" />
      {items.map((item, index) => (
        <motion.div
          key={item}
          layout
          onDragOver={(e) => onDragOver(e, index)}
          onDrop={(e) => onDrop(e, index)}
          className="bg-gray-100 p-3 px-4 rounded-md w-full flex items-center"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <button
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragEnd={onDragEnd}
            className="cursor-move p-2 hover:bg-gray-200 rounded mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
          <span>{item}</span>
        </motion.div>
      ))}
    </div>
  )
}
