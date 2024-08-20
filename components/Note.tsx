import { useState } from "react"
import { motion, useDragControls } from "framer-motion"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"

export default function Note({
  id,
  deleteNote,
}: {
  id: number
  deleteNote: (id: number) => void
}) {
  const dragControls = useDragControls()
  const [expanded, setExpanded] = useState(false)

  const NoteVariants = {
    expanded: {
      height: "300px",
      width: "400px",
    },
    collapsed: {
      height: "150px",
      width: "240px",
    },
  }
  Placeholder.configure({
    emptyEditorClass: "is-editor-empty",
  })

  const note = useEditor({
    extensions: [StarterKit, Placeholder],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  })

  return (
    <motion.div
      className="fixed z-[100] pt-[22px] bg-gray-200 drop-shadow-xl border border-white/70 rounded-[10px] overflow-hidden"
      style={{
        boxShadow: "inset 0px 0px 2px 2px rgba(0, 0, 0, 0.04)",
        right: "20px",
        bottom: `${(id + 1) * 20}px`,
      }}
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.2}
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        ...NoteVariants[expanded ? "expanded" : "collapsed"],
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: id * 0.1,
      }}
    >
      <motion.div
        className="hover:bg-gray-300/50 overflow-hidden absolute top-0 left-0 flex items-center justify-end p-2 w-full h-[25px] transition-all cursor-pointer"
        onPointerDown={(e) => dragControls.start(e)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: id * 0.1 + 0.3 }}
      >
        <div className="flex gap-2">
          <button
            onClick={() => setExpanded(false)}
            className="w-[12px] h-[12px] hover:scale-[1.1] transition-all bg-green-500 rounded-full"
          ></button>
          <button
            onClick={() => setExpanded(true)}
            className="w-[12px] h-[12px] hover:scale-[1.1] transition-all bg-yellow-500 rounded-full"
          ></button>
          <button
            onClick={() => deleteNote(id)}
            className="w-[12px] h-[12px] hover:scale-[1.1] transition-all bg-red-500 rounded-full"
          ></button>
        </div>
      </motion.div>
      <motion.div
        className="text-[12px] overflow-auto p-4 text-black/60 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: id * 0.1 + 0.4 }}
      >
        <EditorContent editor={note} />
      </motion.div>
    </motion.div>
  )
}
