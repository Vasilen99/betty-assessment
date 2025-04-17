import { useEffect, useState } from "react";
import "./App.css";
import Carousel from "./components/Carousel/indes";

const LIMITS_OF_IMAGES = [2, 5, 10, 30, 60, 100];

function App() {
  const [images, setImages] = useState();
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://picsum.photos/v2/list?limit=${limit}`
        );
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImages();
  }, [limit]);

  return (
    <div>
      {LIMITS_OF_IMAGES.map((singleLimit) => (
        <button onClick={() => setLimit(singleLimit)}>
          {" "}
          {singleLimit} Images
        </button>
      ))}
      <Carousel items={images} />
    </div>
  );
}

export default App;
