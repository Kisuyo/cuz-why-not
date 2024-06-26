import { PanInfo, motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

const ITEMS = [
  {
    title: "UI Design",
    description: "Design intuitive user interfaces and experiences.",

    id: 1,
  },
  {
    title: "Frontend Development",
    description: "Build interactive, visually compelling web pages.",

    id: 2,
  },
  {
    title: "Motion Design",
    description: "Create engaging animations and transitions.",

    id: 3,
  },
  {
    title: "Design Engineer",
    description: "Focusing on details, design systems, and code.",

    id: 4,
  },
  {
    title: "Product Management",
    description: "Manage product lifecycle, from conception to launch.",

    id: 5,
  },
];

const ITEM_WIDTH = 200;
const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const CONTAINER_WIDTH = ITEM_WIDTH + GAP;

const SPRING_OPTIONS = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export default function Subtle3DCarousel() {
  const x = useMotionValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.min(prev + 1, ITEMS.length - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const leftConstraint = -((ITEM_WIDTH + GAP) * (ITEMS.length - 1));

  return (
    <div className="relative overflow-hidden rounded-[var(--outer-r)]">
      <motion.div
        className="flex"
        drag="x"
        dragConstraints={{
          left: leftConstraint,
          right: 0,
        }}
        style={{
          width: ITEM_WIDTH,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: currentIndex * ITEM_WIDTH + ITEM_WIDTH / 2,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * (ITEM_WIDTH + GAP)) }}
        transition={SPRING_OPTIONS}
      >
        {ITEMS.map((item, index) => {
          const range = [
            (-100 * (index + 1) * CONTAINER_WIDTH) / 100,
            (-100 * index * CONTAINER_WIDTH) / 100,
            (-100 * (index - 1) * CONTAINER_WIDTH) / 100,
          ];
          const nextIndex = Math.min(index + 1, ITEMS.length - 1);
          const prevIndex = Math.max(index - 1, 0);
          const outputRange = [nextIndex ? 90 : 90, 0, prevIndex ? -90 : -90];
          const rotateY = useTransform(x, range, outputRange, {
            clamp: false,
          });
          return (
            <motion.div
              key={index}
              className="relative flex shrink-0 bg-neutral-200 flex-col items-start justify-between rounded-lg"
              style={{
                width: ITEM_WIDTH,
                height: "200px",
                rotateY: rotateY,
              }}
              transition={SPRING_OPTIONS}
            ></motion.div>
          );
        })}
      </motion.div>
      {/* <div className="flex w-full justify-center">
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {ITEMS.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-150  ${
                currentIndex === index
                  ? "bg-mauve-light-9 dark:bg-mauve-dark-9"
                  : "bg-mauve-light-9/40 dark:bg-mauve-dark-9/40"
              }`}
              animate={{ scale: currentIndex === index ? 1.2 : 1 }}
              onClick={() => setCurrentIndex(index)}
              transition={{
                duration: 0.15,
              }}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
}
