import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import Icons from "../Icons"

export default function Dashboard() {
  const [items, setItems] = useState([
    {
      name: "items1",
      email: "email1@gmail.com",
      id: 1,
      images: [
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
      ],
    },
    {
      name: "items2",
      email: "email2@gmail.com",
      id: 2,
      images: [
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
      ],
    },
    {
      name: "items3",
      email: "email3@gmail.com",
      id: 3,
      images: [
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
      ],
    },
  ])
  const [editItem, setEditItem] = useState<number | null>(null)
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  return (
    <div className="w-full flex flex-col h-full p-[40px] gap-2 px-[100px]">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="w-full bg-gray-100 cursor-pointer border border-slate-400/20 overflow-hidden"
          animate={{
            height: expandedItem === item.id ? "auto" : "60px",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div
            className="flex justify-between items-center h-[60px] sm:h-[70px] lg:h-[60px] px-4 sm:px-6 lg:px-4"
            onClick={() =>
              setExpandedItem(expandedItem === item.id ? null : item.id)
            }
          >
            <h2 className="text-base sm:text-lg lg:text-md">{item.email}</h2>
          </div>
          <AnimatePresence>
            {expandedItem === item.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className=" px-4 sm:px-6 relative flex flex-col gap-4 lg:px-4 pb-4 sm:pb-6 lg:pb-4 pt-2 text-base"
              >
                <div className=" flex  gap-2 items-center text-[20px]">
                  Tokens: <span className="">500</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-[20px]">Images</div>
                  <div className="flex gap-1 overflow-x-auto">
                    {item.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="image"
                        className="h-[120px] max-w-[500px]"
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-blue-400 text-white hover:bg-blue-500 transition-all flex-center h-[34px] w-[80px]">
                  Edit
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
