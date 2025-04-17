import React, { useEffect, useRef } from "react";
import "./style.css";

type Image = {
  download_url: string;
};

type CarouselProps = {
  items: Image[] | undefined;
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 3000,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const realLength = items ? items.length : 0;

  console.log(items)

  const extendedItems = items
    ? [
        items[items.length - 1], // clone last
        ...items,
        items[0], // clone first
      ]
    : [];

 // Set initial scroll position to the first real slide
 useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const slideWidth = container.clientWidth;
      console.log(slideWidth)
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

      if (index === 0) {
        // Snap to last real item
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = slideWidth * realLength;
        requestAnimationFrame(() => {
          container.style.scrollBehavior = 'smooth';
        });
      }

      if (index === realLength + 1) {
        // Snap to first real item
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = slideWidth;
        requestAnimationFrame(() => {
          container.style.scrollBehavior = 'smooth';
        });
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [realLength]);

  useEffect(() => {
    if (!autoPlay) return;

    const container = containerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval]);

  if(!items) return <div>loading ...</div>

  return (
    <div className="carousel-grid" ref={containerRef}>
      {extendedItems.map((item, index) => (
        <div className="carousel-cell" key={index}>
          <img
            src={item.download_url}
            loading="lazy"
            alt="carousel image"
            width={200}
            height={200}
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
