export enum SpellLevel {
    Cantrip = 0,
    FirstLevel = 1,
    SecondLevel = 2,
    ThirdLevel = 3,
    FourthLevel = 4,
    FifthLevel = 5,
    SixthLevel = 6,
    SeventhLevel = 7,
    EighthLevel = 8,
    NinthLevel = 9
}

export const levelsString = {
    0: "Cantrip",
    1: "Level 1",
    2: "Level 2",
    3: "Level 3",
    4: "Level 4",
    5: "Level 5",
    6: "Level 6",
    7: "Level 7",
    8: "Level 8",
    9: "Level 9",
}

export enum SpellClass {
    Artificer = "artificer",
    Bard = "bard",
    Cleric = "cleric",
    Druid = "druid",
    Paladin = "paladin",
    Ranger = "ranger",
    Sorcerer = "sorcerer",
    Warlock = "warlock",
    Wizard = "wizard"
}

export enum ComponentType {
    Verbal = "Verbal",
    Somatic = "Somatic",
    Material = "Material"
}

export enum SchoolType {
    Abjuration = "abjuration",
    Conjuration = "conjuration",
    Divination = "divination",
    Enchantment = "enchantment",
    Evocation = "evocation",
    Illusion = "illusion",
    Necromancy = "necromancy",
    Transmutation = "transmutation",
    Unknown = "unknown"
}

export enum RangeType {
    Self = "Self",
    Touch = "Touch",
    Sight = "Sight",
    Special = "Special",
    Unlimited = "Unlimited",
    Units = "Units",
    Unknown = "Unknown"
}

export enum CastType {
    Action = "Action",
    Bonus = "Bonus",
    Reaction = "Reaction",
    Time = "Time",
    Unknown = "Unknown"
}

export interface Spell {
    _id: string,
    name: string,
    description: string,
    level: SpellLevel,
    school: string,
    duration: string,
    is_concentration: boolean,
    cast_type: CastType,
    cast_time: number,
    is_ritual: boolean,
    range_type: RangeType,
    spell_range: string,
    has_upcast: boolean,
    upcast: string,
    components: ComponentType[],
    component_material: string,
    classes: SpellClass[],
    is_recommended: boolean,
    image_url: string,
    url: string,
    index: number | undefined
}