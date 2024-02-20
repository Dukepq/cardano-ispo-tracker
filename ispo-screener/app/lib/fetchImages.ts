import base from "./routes";

export default async function fetchImages(
  cookie: string,
  page?: string | number,
  items?: string | number,
  revalidate = 0
): Promise<{ data: Logo[]; count: number }> {
  const pageQuery = page ? page : 0;
  const itemsQuery = items ? items : 0;
  const response = await fetch(
    base + `/api/images?page=${pageQuery}&items=${itemsQuery}`,
    {
      method: "GET",
      next: { revalidate },
      credentials: "include",
      headers: {
        Cookie: cookie,
      },
    }
  );
  if (!response.ok)
    throw new Error("failed to fetch images: " + response.status);
  return response.json();
}
