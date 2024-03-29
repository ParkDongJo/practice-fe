import React, { useState, useEffect, useRef } from "react";
import debounce from "../libs/debouce";

export default function Carousel() {
  const images = [
    { id: 1, name: "image1", url: "", bgColor: "bg-red-100" },
    { id: 2, name: "image2", url: "", bgColor: "bg-blue-100" },
    { id: 3, name: "image3", url: "", bgColor: "bg-green-100" },
  ];

  const [curr, setCurr] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const playDebounced = debounce(() => {
    setIsPlaying(true);
  }, 500);

  const moveToPrev = () => {
    setCurr((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }
  const moveToNext = () => {
    setCurr((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  const handleClickPrev = () => {
    setIsPlaying(false);
    moveToPrev();

    playDebounced();
  };
  const handleClickNext = () => {
    setIsPlaying(false);
    moveToNext();

    playDebounced();
  };

  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(() => {
        moveToNext();
      }, 3000);
      return () => clearInterval(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curr, isPlaying]);

  return (
    <div className="relative flex h-[500px] items-center overflow-hidden bg-black-100">
      <ul
        className={`flex h-[300px] items-center ${moveStyle[curr]} transition`}
      >
        {images.map((image) => (
          <li key={image.id} className={`w-[100vw] h-[300px] ${image.bgColor}`}>
            <img
              src={image.url}
              alt={image.name}
              className="object-contain w-full"
            />
          </li>
        ))}
      </ul>
      <button
        className="absolute left-[10px] flex h-[10px] w-[10px] items-center justify-center rounded-full bg-black-10 opacity-50"
        onClick={handleClickPrev}
      >
        이전
      </button>
      <button
        className="absolute right-[10px] flex h-[10px] w-[10px] items-center justify-center rounded-full bg-black-10 opacity-50"
        onClick={handleClickNext}
      >
        다음
      </button>
      <ul className="absolute flex justify-center w-full gap-4 bottom-20">
        {images.map((image, idx) => (
          <li
            key={image.id}
            className={`h-[1.2rem] w-[1.2rem] rounded-full bg-white ${
              idx === curr ? "opacity-100" : "opacity-50"
            }`}
          >
            <button onClick={() => setCurr(idx)}>o</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const moveStyle = {
  0: "translate-x-0",
  1: "translate-x-[-100vw]",
  2: "translate-x-[-200vw]",
  3: "translate-x-[-300vw]",
  4: "translate-x-[-400vw]",
  5: "translate-x-[-500vw]",
  6: "translate-x-[-600vw]",
  7: "translate-x-[-700vw]",
  8: "translate-x-[-800vw]",
  9: "translate-x-[-900vw]",
  10: "translate-x-[-1000vw]",
};
