import { Dispatch, createContext, useReducer } from "react";
import ReactDOM from "react-dom/client";
import { Spell } from "../types/types";

export const Setters: {[key: string]: string} = {
    "spells": "setSpells",
    "page": "setPage",
    "name": "setSpellName",
    "level": "setLevel",
    "classes": "setClasses",
    "cast_type": "setCastType",
    "school": "setSchool",
    "range_type": "setRangeType",
    "components": "setComponents",
    "has_upcast": "setHasUpcast",
    "is_ritual": "setIsRitual",
    "is_concentration": "setIsConcentration",
    "is_recommended": "setIsRecommended",
}

export const initialParamState = {
    "spells": [],
    "params": {
        "name": "",
        "classes": "",
        "level": "",
        "cast_type": "",
        "school": "",
        "range_type": "",
        "components": "",
        "has_upcast": "",
        "is_ritual": "",
        "is_concentration": "",
        "is_recommended": "",
    },
    "page": 1
};

export const ParamsReducer = (state: any, action: any) => {
    switch(action.type) {
        case "reset":
            return {...initialParamState, "spells": state.spells};
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
                ...state,
                "spells": [],
                "params": {
                    ...state.params,
                    "name": action.payload,
                },
                "page": 1
            }
        case "setClasses":
            return {
                ...state,
                "spells": [],
                "params": {
                    ...state.params,
                    "classes": action.payload
                },
                "page": 1
            }
        case "setLevel":
            return {
                ...state,
                "spells": [],
                "params": {
                    ...state.params,
                    "level": action.payload
                },
                "page": 1
            }
        case "setCastType":
            return {
                ...state,
                "spells": [],
                "params": {
                    ...state.params,
                    "cast_type": action.payload
                },
                "page": 1
            }
        case "setSchool":
            return {
                ...state,
                "spells": [],
                "params": {
                    ...state.params,
                    "school": action.payload
                },
                "page": 1
            }
        case "setRangeType":
            return {
                ...state,
                "spells": [],
                "params": {
                    ...state.params,
                    "range_type": action.payload
                },
                "page": 1
            }
        case "setComponents":
            return {
                ...state,
                "spells": [],
                "params": {
                    ...state.params,
                    "components": action.payload
                },
                "page": 1
            }
        case "setHasUpcast":
            return {
                ...state,
                "spells": [],
                "params": {
                    ...state.params,
                    "has_upcast": action.payload
                },
                "page": 1
            }
        case "setIsRitual":
            return {
                ...state,
                "spells": [],
                "params": {
                    ...state.params,
                    "is_ritual": action.payload
                },
                "page": 1
            }
        case "setIsConcentration":
            return {
                ...state,
                "spells": [],
                "params": {
                    ...state.params,
                    "is_concentration": action.payload
                },
                "page": 1
            }
        case "setIsRecommended":
            return {
                ...state,
                "spells": [],
                "params": {
                    ...state.params,
                    "is_recommended": action.payload
                },
                "page": 1
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
