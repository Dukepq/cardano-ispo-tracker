import Carousel from "./Carousel";
import { fetchAllProjects } from "../lib/fetchIspoData";
import ISPOCard from "./ISPOCard";

export default async function () {
  const ISPOs = await fetchAllProjects();

  return (
    <Carousel>
      {ISPOs.map((ispo, index) => {
        if (index > 10) return;
        return <ISPOCard {...ispo} key={ispo.token} />;
      })}
    </Carousel>
  );
}
