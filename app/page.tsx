"use client";

import Image from "next/image";
import getSpells from "@/lib/spells";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Navigation from "@/app/navigation/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  let [page, setPage] = useState(1);

  let [spells, setSpells] = useState<any[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set('page', page.toString());
      getSpells(params).then((data) => {
        let data_res: any[] = data.results;
        setSpells([...spells, ...data_res]);
      });
    };
  }, [page]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navigation/>
      <button onClick={() => setPage(page + 1)}>Next</button>
      <p>{JSON.stringify(spells)}</p>
    </main>
  );
}