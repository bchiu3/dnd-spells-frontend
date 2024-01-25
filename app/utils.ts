import { useEffect, useRef } from "react";
import { CastType, ComponentType, RangeType, SchoolType, SpellClass, SpellLevel, levelsString } from "./types/types";

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

export const SelectValueMap: {[key: string]: {[key: string]: string}} = {
    "level": {
      [SpellLevel.Cantrip.toString()]: "Cantrip",
      [SpellLevel.FirstLevel.toString()]: "Level 1",
      [SpellLevel.SecondLevel.toString()]: "Level 2",
      [SpellLevel.ThirdLevel.toString()]: "Level 3",
      [SpellLevel.FourthLevel.toString()]: "Level 4",
      [SpellLevel.FifthLevel.toString()]: "Level 5",
      [SpellLevel.SixthLevel.toString()]: "Level 6",
      [SpellLevel.SeventhLevel.toString()]: "Level 7",
      [SpellLevel.EighthLevel.toString()]: "Level 8",
      [SpellLevel.NinthLevel.toString()]: "Level 9",
    },
    "class": {
      [SpellClass.Artificer]: "Artificer",
      [SpellClass.Bard]: "Bard",
      [SpellClass.Cleric]: "Cleric",
      [SpellClass.Druid]: "Druid",
      [SpellClass.Paladin]: "Paladin",
      [SpellClass.Ranger]: "Ranger",
      [SpellClass.Sorcerer]: "Sorcerer",
      [SpellClass.Warlock]: "Warlock",
      [SpellClass.Wizard]: "Wizard",
    },
    "cast_type": {
      [CastType.Action]: "Action",
      [CastType.Bonus]: "Bonus",
      [CastType.Reaction]: "Reaction",
      [CastType.Time]: "Time",
      [CastType.Unknown]: "Unknown",
    },
    "school": {
      [SchoolType.Abjuration]: "Abjuration",
      [SchoolType.Conjuration]: "Conjuration",
      [SchoolType.Divination]: "Divination",
      [SchoolType.Enchantment]: "Enchantment",
      [SchoolType.Evocation]: "Evocation",
      [SchoolType.Illusion]: "Illusion",
      [SchoolType.Necromancy]: "Necromancy",
      [SchoolType.Transmutation]: "Transmutation",
      [SchoolType.Unknown]: "Unknown",
    },
    "range_type": {
      [RangeType.Self]: "Self",
      [RangeType.Sight]: "Sight",
      [RangeType.Special]: "Special",
      [RangeType.Touch]: "Touch",
      [RangeType.Units]: "Units",
      [RangeType.Unlimited]: "Unlimited",
      [RangeType.Unknown]: "Unknown",
    },
    "components": {
      [ComponentType.Verbal]: "Verbal",
      [ComponentType.Somatic]: "Somatic",
      [ComponentType.Material]: "Material",
    }
}

export const SelectOptions: {[key: string]: {value: string, label: string}[]} = {}; 

for (const [key, value] of Object.entries(SelectValueMap)) {
    SelectOptions[key] = [];
    for (const [k, v] of Object.entries(value)) {
      SelectOptions[key].push({value: k, label: v});
    }
}

export const sanitizeSearchParams = (params: string) => {
  return params.toLowerCase().trim().split("_").join(" ")
}