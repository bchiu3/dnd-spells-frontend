import { useEffect, useRef } from "react";
import { SpellClass, SpellLevel, levelsString } from "./types/types";

export function getParamString(state_params: any) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(state_params)) {
        if (value) {
            params.set(key, value.toString());
        }
    }
    return params.toString();
}

export function useDidUpdateEffect(fn: Function, inputs: any[]) {
    const isMountingRef = useRef(false);
    useEffect(() => {
      isMountingRef.current = true;
    }, []);
    useEffect(() => {
      if (!isMountingRef.current) {
        return fn();
      } else {
        isMountingRef.current = false;
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, inputs);
  }

export const SelectOptions: {[key: string]: {value: string, label: string}[]} = {
  "level" : [
    {value: SpellLevel.Cantrip.toString(), label: "Cantrip"},
    {value: SpellLevel.FirstLevel.toString(), label: "Level 1"},
    {value: SpellLevel.SecondLevel.toString(), label: "Level 2"},
    {value: SpellLevel.ThirdLevel.toString(), label: "Level 3"},
    {value: SpellLevel.FourthLevel.toString(), label: "Level 4"},
    {value: SpellLevel.FifthLevel.toString(), label: "Level 5"},
    {value: SpellLevel.SixthLevel.toString(), label: "Level 6"},
    {value: SpellLevel.SeventhLevel.toString(), label: "Level 7"},
    {value: SpellLevel.EighthLevel.toString(), label: "Level 8"},
    {value: SpellLevel.NinthLevel.toString(), label: "Level 9"},
  ],
  "class" : [
    {value: SpellClass.Artificer, label: "Artificer"},
    {value: SpellClass.Bard, label: "Bard"},
    {value: SpellClass.Cleric, label: "Cleric"},
    {value: SpellClass.Druid, label: "Druid"},
    {value: SpellClass.Paladin, label: "Paladin"},
    {value: SpellClass.Ranger, label: "Ranger"},
    {value: SpellClass.Sorcerer, label: "Sorcerer"},
    {value: SpellClass.Warlock, label: "Warlock"},
    {value: SpellClass.Wizard, label: "Wizard"},
  ]
};