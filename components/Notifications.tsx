import { motion } from "framer-motion";
import { useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    "error1",
    "wtf2",
    "error3",
  ]);
  const [hovered, setHovered] = useState(false);
  const handleClick = () => {
    setNotifications((prevNotifications) => {
      const updatedNotifications = [...prevNotifications, "error4"];

      updatedNotifications.shift();
      return updatedNotifications;
    });
  };
  return (
    <div>
      <button onClick={handleClick}>{notifications}</button>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="fixed bottom-10 right-[50%] z-[200]  w-[400px] translate-x-[50%]"
      >
        {notifications.map((notification, index) => {
          return (
            <motion.div
              animate={{
                translateY: ["40px", "0"],
              }}
              layout
              initial={{ translateX: "50%" }}
              transition={{ type: "spring", duration: (index + 1) * 0.7 }}
              key={index}
              className="absolute right-[50%] border-2 border-black/10 transition-all bg-gray-100 rounded-lg flex-center p-2 px-4"
              style={{
                bottom: hovered ? -index * 50 : -index * 10,
                width: hovered ? "200px" : index * 10 + 200,
                zIndex: index,
              }}
            >
              {notification}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
