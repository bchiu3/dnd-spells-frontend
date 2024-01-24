"use client";

import Image from "next/image";
import getSpells from "@/lib/spells";
import { createContext, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Navigation from "@/app/navigation/navigation";
import { useReducer, useContext } from "react";
import { initialParamState as initialState, ParamsReducer as reducer, reducerContext } from "./reducer/NavReducer";
import SpellCardWrapper from "./spellCards/spell_card_wrapper";


export default function Page() {
  const searchParams = useSearchParams();
  let [state, dispatch] = useReducer(reducer, initialState);

  return (
    <reducerContext.Provider value={{state, dispatch}}>
      <main className="flex min-h-screen flex-col items-center justify-between min-w-screen">
          <Navigation/>
          <SpellCardWrapper className="pt-[5rem]" spells={state.spells}/>
      </main>
    </reducerContext.Provider>
  );
}