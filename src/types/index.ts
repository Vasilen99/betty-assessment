export type Image = {
    download_url: string;
  };

export type CarouselProps = {
    items: Image[] | undefined;
    setImageIndex: (image: number) => void;
  };