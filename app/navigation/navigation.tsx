import styles from './navigation.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import SearchInput from './inputs/search_input';
import { useDebouncedCallback } from 'use-debounce';
import { useContext, useEffect, useState } from 'react';
import { reducerContext, Setters } from '../reducer/NavReducer';
import { AnimatePresence, motion } from 'framer-motion';
import { SelectOptions } from '../utils';


const variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }
}


export default function Navigation() {
    const { state, dispatch } = useContext(reducerContext);
    const [modal, setModal] = useState(false);

    const searchTerms = []; 
    for (const [key, value] of Object.entries(state.params)) {
        const searcher = {
            value: value,
            changeHandler: (newValue: any) => {
                dispatch({type: Setters[key], payload: newValue});
            },
            selectOptions: SelectOptions[key]
        }
        searchTerms.push(searcher);
    };

    return (
        <AnimatePresence>
            {modal ?? 
            <motion.div 
            variants={variants}
            initial = "hidden"
            animate = "visible"
            exit = "hidden"
            transition={{duration: 0.1, ease: "easeInOut"}}
            className={clsx("fixed top-0 w-screen border-b-4 bg-black z-10", styles.module)}>
                <Image className={"pl-1"} src="/header-logo.png" alt="dnd-spells-logo" width={58} height={38} priority={true}/>
                <SearchInput placeholder={''}
                onChange={useDebouncedCallback(searchTerms[0].changeHandler, 500)} />
                <Image src="/hamburger_icon.svg" alt="hamburger-icon" width={17} height={20} className='mr-4'/>
            </motion.div>}
        </AnimatePresence>
    )
}