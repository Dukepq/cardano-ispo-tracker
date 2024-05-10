import Carousel from "./Carousel";
import { fetchAllProjects } from "../lib/fetchIspoData";
import ISPOCard from "./ISPOCard";
import shuffleArray from "../lib/shuffleArray";

export default async function ServerCarouselWrapper({
  maxCards,
}: {
  maxCards?: number;
}) {
  const ISPOs = await fetchAllProjects();
  return (
    <Carousel>
      {shuffleArray(
        ISPOs.map((ispo, index) => {
          const { featured } = ispo;
          if (maxCards && index > maxCards) return;
          if (featured) return <ISPOCard {...ispo} key={ispo.token} />;
        })
      )}
    </Carousel>
  );
}
