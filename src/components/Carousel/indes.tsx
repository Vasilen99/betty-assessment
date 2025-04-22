import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Image } from "../../types";

type CarouselProps = {
  items: Image[] | undefined;
  setImageIndex: (image: number) => void;
};

const Carousel: React.FC<CarouselProps> = ({ items, setImageIndex }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScrollActive, setIsScrollActive] = useState<boolean>(false);

  //Real Lenght of items is the extended lenght minus the first and last cloned items.
  const realLength = items?.length ? items.length - 2 : 0;

  // Set initial scroll position to the first real slide
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const slideWidth = container.clientWidth;
      container.scrollLeft = slideWidth;
    }
  }, [containerRef.current]);

  // Looping logic when scrolling reaches clone slides
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const slideWidth = container.clientWidth;
      const index = Math.round(container.scrollLeft / slideWidth);
      const shouldScroll = container.scrollLeft % slideWidth === 0;
      if (index === 0 && shouldScroll) {
        // Snap to last real item
        setTimeout(() => {
          container.style.scrollBehavior = "auto";
          container.scrollLeft = slideWidth * realLength;
        }, 150);
      }
      if (index === realLength + 1 && shouldScroll) {
        // Snap to first real item
        container.style.scrollBehavior = "auto";
        setTimeout(() => {
          container.scrollLeft = slideWidth;
        }, 150);
      }
      setImageIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [realLength, containerRef.current]);

  if (!items?.length) return <div>loading ...</div>;

  return (
    <div className="carousel-wrapper">
      <div
        className={`carousel-grid ${isScrollActive && "scrollable"}`}
        ref={containerRef}
      >
        {items.map((item, index) => (
          <div className="carousel-cell" key={index}>
            <img
              src={item.download_url}
              alt="carousel image"
              loading="lazy"
              width={200}
              height={300}
            />
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => setIsScrollActive((prev) => !prev)}
          className="manage-scroll-button"
        >
          {isScrollActive ? "Show" : "Hide"} scroll
        </button>
      </div>
    </div>
  );
};

export default Carousel;
