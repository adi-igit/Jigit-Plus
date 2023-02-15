/* eslint-disable @next/next/no-img-element */
import React from 'react';

export default function ImageHandler({
  src,
  selectedImg,
  images,
  setSelectedImg,
}) {
  const handleChange = (i) => {
    setSelectedImg(i);
  };

  return (
    <div className="lg:w-[33%]">
      <div className="flex flex-col lg:flex-row mt-20 transition-all">
        <img
          className="lg:h-[500px] cursor-pointer"
          alt="parent-image"
          src={src}
        />
        <div className="relative ml-4 lg:h-[500px] w-[2px] border">
          <div
            style={{ height: `${71 * selectedImg}px` }}
            className="hidden lg:block absolute w-[2px] border-l border-black duration-500"
          />
        </div>
        <div className="ml-4 flex flex-wrap lg:flex-col gap-2 mt-4">
          {images?.map((img, i) => (
            <img
              key={i}
              alt="child-images"
              onClick={() => handleChange(i)}
              src={img}
              className="w-[30px] cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
}