// components/Carousel.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
} from "react-icons/io";

export default function Carousel({ images = [] }) {
  const banners = [
    images[images.length - 1],
    ...images,
    images[0],
  ];

  const [index, setIndex] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const totalSlides = images.length;

  const handleSlide = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = index + dir;
    setIndex(newIndex);
    const newActiveIndex = (activeIndex + dir + totalSlides) % totalSlides;
    setActiveIndex(newActiveIndex);
  };

  useEffect(() => {
    if (index === 0 || index === banners.length - 1) {
      const timeout = setTimeout(() => {
        setIsAnimating(false);
        const jumpTo = index === 0 ? banners.length - 2 : 1;
        setIndex(jumpTo);
        containerRef.current.style.transition = "none";
        containerRef.current.style.transform = `translateX(-${jumpTo * 100}%)`;
        void containerRef.current.offsetWidth;
        containerRef.current.style.transition = "transform 0.6s ease-in-out";
      }, 600);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const jumpTo = (i) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(i + 1);
    setActiveIndex(i);
  };

  return (
    <div className="relative overflow-hidden w-full ">
      <motion.div
        ref={containerRef}
        className="flex w-full h-full"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: "transform 0.6s ease-in-out",
        }}
      >
        {banners.map((src, i) => (
          <div key={i} className="w-full flex-shrink-0 h-full">
            <img
              src={src}
              alt={`Banner ${i}`}
              className="w-full max-h-[536px] object-cover object-center"
            />
          </div>
        ))}
      </motion.div>

      <button
        onClick={() => handleSlide(-1)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white lg:p-1 rounded-full shadow hover:bg-gray-100 z-10"
      >
        <IoIosArrowRoundBack size={28} />
      </button>
      <button
        onClick={() => handleSlide(1)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white lg:p-1 rounded-full shadow hover:bg-gray-100 z-10"
      >
        <IoIosArrowRoundForward size={28} />
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === i
                ? "w-[30px] bg-[#FEFEFE]"
                : "w-[8px] bg-[#FEFEFE] hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
