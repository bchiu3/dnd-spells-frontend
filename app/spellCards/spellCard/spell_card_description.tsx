import styles from "./spell_card.module.scss";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";
import { ComponentType, Spell, levelsString } from "@/app/types/types";
import { Laila } from "next/font/google";

export interface SpellCardDescriptionProps {
    spell: Spell
}

const lalia = Laila({ weight: ["400", "700"], style: "normal", subsets: ["latin"] });

export default function SpellCardDescription({spell}: SpellCardDescriptionProps) {
    return (
        <motion.div className={styles.card_content}>
            <motion.div className={clsx(styles.card_header, lalia.className)}>
                <Image src={spell.image_url || "https://placehold.co/100x100"} alt="spell-card" width={30} height={30} />
                <span>{spell.name}</span>
            </motion.div>
            <div className={clsx(lalia.className, "font-normal text-[11px] !italic capitalize")}>
                {levelsString[spell.level]}
                {spell.school ? " (" + 
                (spell.range_type.toLowerCase() == "units" ? spell.spell_range : spell.range_type)
                 + ")" : ""}
            </div>
            <div dangerouslySetInnerHTML={{ __html: spell.description }} className={clsx(styles.card_description, lalia.className)}/>
        </motion.div>
    )
}