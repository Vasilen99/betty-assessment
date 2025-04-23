import { useEffect, useState } from "react";
import "./App.css";
import Carousel from "./components/Carousel/indes";
import { LIMITS_OF_IMAGES } from "./utils/constants";
import { Image } from "./types";
import NotFound from "./components/NotFount";
import { fetchImages } from "./api";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [fetchedPagesOfImages, setFetchedPagesOfImages] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(1);

  // Initial fetch when limit changes
  useEffect(() => {
    const loadInitialImages = async () => {
      const initialData = await fetchImages(1, limit);
      setImages(initialData);
      setFetchedPagesOfImages(1); // reset pages
    };
    loadInitialImages();
  }, [limit]);

  useEffect(() => {
    const totalFetchedImages = images.length;
    const imagesPerPage = 100;
    const shouldTriggerFetch =
      currentImageIndex >= totalFetchedImages - 2 && // approaching end
      limit > 100 &&
      images.length < limit;

    if (shouldTriggerFetch) {
      const expectedPage = Math.floor(totalFetchedImages / imagesPerPage) + 1;

      if (expectedPage > fetchedPagesOfImages) {
        const loadMoreImages = async () => {
          const newImages = await fetchImages(expectedPage, imagesPerPage);
          setImages((prev) => [...prev, ...newImages]);
          setFetchedPagesOfImages(expectedPage);
        };
        loadMoreImages();
      }
    }
  }, [currentImageIndex, images, fetchedPagesOfImages, limit]);

  const extendedItems = images.length
    ? [
        images[images.length - 1], // clone last
        ...images,
        images[0], // clone first
      ]
    : [];

  if (!images.length) return <NotFound />;

  return (
    <>
      <h2 className="text-black filters-label">Select Number of Images</h2>
      <div className="buttons-grid">
        {LIMITS_OF_IMAGES.map((singleLimit) => (
          <button
            className={`primary-button ${
              singleLimit === limit && "active-limit"
            }`}
            key={singleLimit}
            onClick={() => setLimit(singleLimit)}
          >
            {" "}
            {singleLimit} Images
          </button>
        ))}
      </div>
      <p className="text-black">or</p>
      <button className="primary-button" onClick={() => setImages([])}>
        Remove all images
      </button>
      <Carousel
        items={extendedItems}
        setImageIndex={(index: number) => setCurrentImageIndex(index)}
      />
    </>
  );
}

export default App;
