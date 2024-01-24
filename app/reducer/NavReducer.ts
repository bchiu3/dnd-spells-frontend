import { Dispatch, createContext, useReducer } from "react";
import ReactDOM from "react-dom/client";
import { Spell } from "../types/types";

export const Setters: {[key: string]: string} = {
    "spells": "setSpells",
    "page": "setPage",
    "name": "setSpellName",
    "level": "setLevel",
}

export const initialParamState = {
    "spells": [],
    "params": {
        "name": "",
        "class": "",
        "level": ""
    },
    "page": 1
};

export const ParamsReducer = (state: any, action: any) => {
    switch(action.type) {
        case "setSpells":
            return {
                ...state,
                "spells": addIndexSpells(action.payload)
            }
        case "addSpells":
            return {
                ...state,
                "spells": [...state.spells, ...addIndexSpells(action.payload)]
            }
        case "setPage":
            return {
                ...state,
                "page": action.payload
            }
        case "nextPage":
            return {
                ...state,
                "page": state.page + 1
            }
        //changing any search params means we need to reset the page and clear out the spells
        case "setSpellName":
            return {
                "spells": [],
                "params": {
                    ...state.params,
                    "name": action.payload,
                },
                "page": 1
            }
        case "setClass":
            return {
                ...state,
                "params": {
                    ...state.params,
                    "class": action.payload
                }
            }
        case "setLevel":
            return {
                ...state,
                "params": {
                    ...state.params,
                    "levels": action.payload
                }
            }
        default:
            return state
    }
}

const dispath_initial: Dispatch<any> = () => {};

export const reducerContext = createContext({
    state: initialParamState, 
    dispatch: dispath_initial
});

const addIndexSpells = (payload: Spell[]) => {
    return payload.map((element: Spell, index: number) => {
        return {...element, index: index}
    });
}
