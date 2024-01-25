import { CastType, ComponentType, RangeType, Spell, levelsString } from "@/app/types/types"
import { motion, AnimatePresence } from "framer-motion"
import { MouseEventHandler } from "react"
import style from "./spell_card_modal.module.scss"
import Image from "next/image"
import clsx from "clsx"
import { Laila } from "next/font/google"
import SpellCardIcons from "../spell_card_icons"
import React from "react"

export interface SpellCardModalProps {
    modal: boolean
    closeModal: MouseEventHandler<HTMLElement>
    spell: Spell
}

const variants = {
    hidden: {
        opacity: 0,
        height: "25vh",
    },
    visible: {
        opacity: 1,
        height: "100vh",
    }
}

const lalia = Laila({ weight: ["400", "700"], style: "normal", subsets: ["latin"] });

export default function SpellCardModal({modal, closeModal, spell}: SpellCardModalProps) {

    const upcast = (spell.has_upcast ? ("<p>Upcast:" + spell.upcast + "</p></br>").toString() : "");

    return (
        <AnimatePresence>
        {modal &&
        <motion.div 
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={"fixed w-screen h-screen left-0 top-0 z-50 bg-[rgba(0,0,0,0.50)] flex items-center justify-center"}
        onClick={closeModal}
        key={spell._id}
        >
            <motion.div className={style.gradient_container}>
                <motion.div className={style.modal_container} onClick={(e) => e.stopPropagation()}>
                    <Image src="/exit.svg" alt="exit" width={19} height={26} onClick={closeModal} className="self-end mr-2 mt-1 p-0" priority={true}/>
                    <motion.div className={clsx(style.modal, lalia.className)}>
                        <motion.div className={style.modal_header}>
                            <Image src={spell.image_url || "/header-logo.png"} alt="spell-card" width={100} height={100}/>
                            <span>{spell.name}</span>
                        </motion.div>

                        <motion.div className={clsx(style.modal_line)} />
                        <SpellCardIcons spell={spell} inModal={true}/>
                        <motion.div className="flex flex-col text-[12px] whitespace-break-spaces capitalize">
                            <motion.div>{levelsString[spell.level]}</motion.div>
                            {/* <motion.div>Components: {spell.components.join(", ")}</motion.div> */}
                            {spell.component_material && 
                                <motion.div>Material: {spell.component_material}</motion.div>
                            }
                            {/* <motion.div>School: {spell.school}</motion.div> */}
                            {/* <motion.div>
                                {"Cast Type: "}
                                {spell.cast_type} 
                                {(spell.cast_type == CastType.Time || spell.cast_time != 0) && " (" + spell.cast_time + ")"}
                            </motion.div> */}
                            <motion.div>{(spell.cast_type == CastType.Time || spell.cast_time != 0) && "Cast Time: " + spell.cast_time}</motion.div>
                            <motion.div>
                                {"Range: "} 
                                {spell.range_type != RangeType.Units && spell.range_type + " " }
                                {spell.spell_range != "0" && spell.spell_range}
                            </motion.div>
                        <motion.div>Classes: {spell.classes.join(", ")}</motion.div>
                        </motion.div>
                        

                        <motion.div className={clsx(style.modal_line)} />

                        <motion.div className={clsx(style.modal_description)} dangerouslySetInnerHTML={{ __html: upcast + spell.description }}/>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>}
        </AnimatePresence>
    )
}