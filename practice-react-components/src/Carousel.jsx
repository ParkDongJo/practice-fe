import React, { useState } from "react";

export default function Carousel() {
  const images = [
    { id: 1, name: "image1", url: "" },
    { id: 2, name: "image2", url: "" },
    { id: 3, name: "image3", url: "" },
  ];
  const [curr, setCurr] = useState(1);

  const handleClickPrev = () => {
    setCurr((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const handleClickNext = () => {
    setCurr((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative flex h-[500px] items-center overflow-hidden bg-black-100">
      <ul
        className={`flex h-[300px] items-center ${moveStyle[curr]} transition`}
      >
        {images.map((image) => (
          <li key={image.id} className="w-[100vw] h-[300px]">
            <img
              src={image.url}
              alt={image.name}
              className="w-full object-contain"
            />
          </li>
        ))}
      </ul>
      <button
        className="absolute right-[10px] flex h-[10px] w-[10px] items-center justify-center rounded-full bg-black-10 opacity-50"
        onClick={handleClickPrev}
      >
        이전
      </button>
      <button
        className="absolute left-[10px] flex h-[10px] w-[10px] items-center justify-center rounded-full bg-black-10 opacity-50"
        onClick={handleClickNext}
      >
        다음
      </button>
      <ul className="absolute bottom-20 flex w-full justify-center gap-4">
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
