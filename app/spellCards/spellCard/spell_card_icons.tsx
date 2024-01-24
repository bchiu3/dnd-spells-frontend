import { ComponentType, Spell, SpellClass } from "@/app/types/types";
import styles from "./spell_card.module.scss";
import Image from "next/image";
import clsx from 'clsx';

export interface SpellCardIconsProps {
    spell: Spell,
    inModal?: boolean
}

const icons: {[key: string] : string} = {
    "recommended": "/spell_icons/recommended.svg",
    "concentration": "/spell_icons/concentration.png",
    "ritual": "/spell_icons/ritual.png",
    "upcast": "/spell_icons/upcast.png",
    "verbal": "/spell_icons/verbal.svg",
    "somatic": "/spell_icons/somatic.svg",
    "material": "/spell_icons/material.svg",
    // "artificer": "/artificer.png",
    // "bard": "/bard.png",
    // "cleric": "/cleric.png",
    // "druid": "/druid.png",
    // "paladin": "/paladin.png",
    // "ranger": "/ranger.png",
    // "sorcerer": "/sorcerer.png",
    // "warlock": "/warlock.png",
    // "wizard": "/wizard.png",
    "abjuration": "/spell_icons/abjuration.png",
    "conjuration": "/spell_icons/conjuration.png",
    "divination": "/spell_icons/divination.png",
    "enchantment": "/spell_icons/enchantment.png",
    "evocation": "/spell_icons/evocation.png",
    "illusion": "/spell_icons/illusion.png",
    "necromancy": "/spell_icons/necromancy.png",
    "transmutation": "/spell_icons/transmutation.png",
    "unknown": "/spell_icons/unknown.png",
    "action": "/spell_icons/action.png",
    "bonus": "/spell_icons/bonus.png",
    "reaction": "/spell_icons/reaction.png",
    "time": "/spell_icons/time.png",
}

function getIconNames(spell: Spell): string[] {
    let icons = [];

    if (spell.is_recommended) {
        icons.push("recommended");
    }
    icons.push(spell.cast_type.toString().toLowerCase());
    if (spell.is_concentration) {
        icons.push("concentration");
    }
    if (spell.is_ritual) {
        icons.push("ritual");
    }
    if (spell.has_upcast) {
        icons.push("upcast");
    }
    for (const component of spell.components) {
        icons.push(component.toString().toLowerCase());
    }
    // for (const classType of spell.classes) {
    //     icons.push(classType.toString().toLowerCase());
    // }
    icons.push(spell.school.toString().toLowerCase());

    return icons
}

export default function SpellCardIcons({spell, inModal}: SpellCardIconsProps) {
    let iconList = getIconNames(spell);

    const iconMap = iconList.map((icon: string, index: number) => {
        return (
            <div key={index} className={clsx(styles.icon_container, inModal && styles.icon_container_modal)} onClick={(e) => e.stopPropagation()}>
                <div className={clsx(styles.icon_tooltip, inModal && styles.icon_tooltip_modal)}>{icon}</div>
                <Image 
                className={clsx(styles.icon, inModal && styles.icon_modal,
                    //add extra padding for svg icons
                    icons[icon].endsWith("svg") && "p-[2px]" )} 
                src={icons[icon]} alt={icon} width={16} height={16}/>
            </div>
        )
    })
    return (
        <div className={clsx(styles.icon_list, inModal && styles.icon_list_modal)}>
            {iconMap}
        </div>
    );
}