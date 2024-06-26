"use client";

import { useEffect, useState } from "react";

export default function CoinFlip() {
  const [squares, setSquares] = useState<number[]>([]);
  const SETSQAURES = 1000;
  useEffect(() => {
    if (squares.length < SETSQAURES) {
      for (let i = 0; i < SETSQAURES; i++) {
        setSquares((prevSquares) => [
          ...prevSquares,
          Math.round(Math.random()),
        ]);
      }
    }
  });
  return (
    <div>
      <div className="flex flex-wrap">
        {squares.map((square, index) => {
          return (
            <div
              key={index}
              className={`flex items-center justify-center w-[10px] h-[10px] ${
                square ? "bg-black" : "bg-gray-100"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
