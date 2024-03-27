'use server';

export async function getSpells(urlParams: string) {
  let res: Response = await fetch(`${process.env.NEXT_PUBLIC_DND_SPELLS_URL}/dnd/spells/?${urlParams}`, {next:{tags:["spells"], revalidate: 3600}});

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return await res.json();
}

export async function getSpecificSpell(spellId: string) {
  let res: Response = await fetch(`${process.env.NEXT_PUBLIC_DND_SPELLS_URL}/dnd/spells/id/${spellId}`, {next:{tags:["spells"], revalidate: 3600}});

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return await res.json();
}