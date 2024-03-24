'use server';

export default async function getFeats(urlParams: string) {
  let res: Response = await fetch(`${process.env.NEXT_PUBLIC_DND_SPELLS_URL}/dnd/feats/?${urlParams}`, {next:{tags:["feats"], revalidate: 3600}});

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return await res.json();
}