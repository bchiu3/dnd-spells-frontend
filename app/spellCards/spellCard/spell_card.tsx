import clsx from "clsx";
import styles from "./spell_card.module.scss";
import {Spell} from "../../types/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SpellCardDescription from "./spell_card_description";
import SpellCardIcons from "./spell_card_icons";
import { createPortal } from "react-dom";
import SpellCardModal from "./spellCardModal/spell_card_modal";
import Image from "next/image";

export interface SpellCardProps {
    spell: Spell
}

interface Size {
    width: number
    height: number
}

const variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }
}

export default function SpellCard({spell}: SpellCardProps) {
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });
    const border = useRef<HTMLImageElement>(null);

    const [modal, setModal] = useState<boolean>(false);

    const card = useCallback((node: HTMLInputElement | null) => {
      if (node !== null) {
        setSize({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height } );
      }
    }, []);

    useEffect(() => {
        if (border.current !== null) {
            border.current.style.height = `${size.height + (size.height * 0.2)}px`;
            border.current.style.width = `${size.width - (size.width * 0.05)}px`;
        }
    }, [size]);


    const onClickHandler = () => {
        setModal(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModalHandler = (e: any) => {
        e.stopPropagation();
        setModal(false);
        document.body.style.overflow = 'unset';
    }

    const modalHTML = createPortal(
        <SpellCardModal modal={modal} closeModal={closeModalHandler} spell={spell}/>,
        document.body
    );

    return (
        <motion.div 
        variants = {variants}
        initial = "hidden"
        animate = {"visible"}
        transition = {{
            delay: spell.index ? spell.index * 0.1: 0,
            duration: 0.25,
            ease: "easeInOut",
            type: "spring"
        }}
        className={clsx(
            styles.container, 
            spell.is_recommended ? styles.recommended_container : styles.nonrecommended_container
        )}
        onClick={onClickHandler}
        ref={card}>
            <motion.div className={styles.card}>
                <SpellCardDescription spell={spell}/>
                <SpellCardIcons spell={spell}/>
            </motion.div>
            <Image src="/card_border.svg" alt="card-border" className={clsx(styles.border)} ref={border} width={307} height={140} priority={true}/>
            {modalHTML}
        </motion.div>
    );
}