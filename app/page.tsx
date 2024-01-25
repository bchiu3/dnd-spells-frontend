"use client";

import Image from "next/image";
import getSpells from "@/lib/spells";
import { createContext, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Navigation from "@/app/navigation/navigation";
import { useReducer, useContext } from "react";
import { initialParamState as initialState, ParamsReducer as reducer, reducerContext } from "./reducer/NavReducer";
import SpellCardWrapper from "./spellCards/spell_card_wrapper";
import { motion } from "framer-motion";


export default function Page() {
  const searchParams = useSearchParams();
  let [state, dispatch] = useReducer(reducer, initialState);

  return (
    <reducerContext.Provider value={{state, dispatch}}>
      <main className="flex min-h-screen flex-col items-center justify-between min-w-screen">
          <Navigation/>
          <SpellCardWrapper className="pt-[5rem]" spells={state.spells}/>
          <motion.div 
          initial={{opacity: 1}}
          animate={{opacity: 0}}
          transition={{delay: 5, duration: 0.5, ease: "easeInOut"}}
          className="text-white fixed bottom-0 left-0 text-[10px] bg-black">
            {process.env.NEXT_PUBLIC_DND_CREDITS}
          </motion.div>
      </main>
    </reducerContext.Provider>
  );
}