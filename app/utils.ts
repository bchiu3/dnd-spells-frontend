import { useEffect, useRef } from "react";
import { CastType, ComponentType, RangeType, SchoolType, SpellClass, SpellLevel, levelsString } from "./types/types";

/* Get param string from a dictionary of state_params*/
export function getParamString(state_params: any) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(state_params)) {
        if (value) {
            params.set(key, value.toString());
        }
    }
    return params.toString();
}

/*Extra hook for mounting and unmounting*/
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

/*Map values to select options*/
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
    "classes": {
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
    },
    "has_upcast": {
      "true": "Upcast Spells",
      "false": "Non-Upcast Spells",
      "": "N/A",
    },
    "is_ritual": {
      "true": "Ritual Spells",
      "false": "Non-Ritual Spells",
      "": "N/A",
    },
    "is_concentration": {
      "true": "Concentration Spells",
      "false": "Non-Concentration Spells",
      "": "N/A",
    },
    "is_recommended": {
      "true": "Recommended Spells",
      "false": "Non-Recommended Spells",
      "": "N/A",
    },
}

/*Map values to options*/
export const SingleValueOptions: {[key: string]: boolean} = {
  "has_upcast": true,
  "is_ritual": true,
  "is_concentration": true,
  "is_recommended": true,
}

/*Options for selection, used for filtering*/
export const SelectOptions: {[key: string]: {value: string, label: string}[]} = {}; 

for (const [key, value] of Object.entries(SelectValueMap)) {
    SelectOptions[key] = [];
    for (const [k, v] of Object.entries(value)) {
      SelectOptions[key].push({value: k, label: v});
    }
}

/* Sanitize search params, usually only used to render*/
export const sanitizeSearchParams = (params: string) => {
  return params.toLowerCase().trim().split("_").join(" ")
}

export function useDebounceFunc(func: Function, milliseconds: number) {
  const time = milliseconds || 400
  let timer: any

  return (event: any) => {
      if (timer) {
          clearTimeout(timer)
      }

      timer = setTimeout(func, time, event)
  }
}