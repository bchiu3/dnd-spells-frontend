import { unstable_noStore } from "next/cache";

export default async function getSpells(urlParams: URLSearchParams|undefined = undefined) {
  let urlStringParams: string = urlParams?.toString() ?? "";
  let res: Response = await fetch(`${process.env.DND_SPELLS_URL}/dnd/spells/?${urlStringParams}`, {next:{tags:["spells"]}});

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return await res.json();
}