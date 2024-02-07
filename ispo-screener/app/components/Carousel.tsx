"use client";

import styles from "./carousel.module.css";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type CarouselProps = { children: React.ReactNode };

export default function Carousel({ children }: CarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ stopOnFocusIn: true, stopOnMouseEnter: true }),
  ]);
  return (
    <div ref={emblaRef} className={styles.embla}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
}
