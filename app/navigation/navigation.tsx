import styles from './navigation.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import SearchInput from './inputs/search_input';
import { DebouncedState, useDebouncedCallback } from 'use-debounce';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { reducerContext, Setters } from '../reducer/NavReducer';
import { AnimatePresence, motion } from 'framer-motion';
import { SelectOptions, SingleValueOptions } from '../utils';
import SelectInput from './inputs/select_input';
import { createPortal } from 'react-dom';


const variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }
}

const variantsModal = {
    hidden: {
        opacity: 0,
        y: "-100vh",
    },
    visible: {
        opacity: 1,
        y: 0,
    }
}

interface Seacher {
    value: string,
    changeHandler: (...args: any) => any,
    selectOptions: any[],
    searchParam: string,
}

export default function Navigation() {
    const { state, dispatch } = useContext(reducerContext);
    const [navModal, setNavModal] = useState(false);


    const searchTerms: Seacher[] = []; 
    for (const [key, value] of Object.entries(state.params)) {
        const searcher = {
            searchParam: key,
            value: value,
            changeHandler: (newValue: any) => {dispatch({type: Setters[key], payload: newValue})},
            selectOptions: SelectOptions[key],
        }
        searchTerms.push(searcher);
    };

    const openModal = (e: any) => {
        setNavModal(true);
        document.body.style.overflow = 'hidden';
    };


    const closeModal = (e: any) => {
        setNavModal(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <>
        <AnimatePresence>
            {
            navModal &&
            <>
                <motion.div 
                key="navModal"
                variants={variantsModal}
                initial = "hidden"
                animate = "visible"
                exit="hidden"
                transition={{duration: 0.25, ease: "easeInOut"}}
                className={clsx("absolute top-0 w-screen border-b-4 z-10 pt-1 pb-20", styles.module, styles.module_modal)}>
                    <Image className={"pt-1"} src="/header-logo.png" alt="dnd-spells-logo" width={71} height={71} priority={true}/>
                    {searchTerms.map((searcher, index) => {
                        if (searcher.selectOptions){
                            return <SelectInput key={index} value={searcher.value} inModal isSingleValue={!!SingleValueOptions[searcher.searchParam]}
                                onChange={searcher.changeHandler} options={searcher.selectOptions} searchParam={searcher.searchParam}/>
                        }
                        return <SearchInput key={index} placeholder={''} onChange={searcher.changeHandler} 
                            searchParam={searcher.searchParam} value={searcher.value} inModal />
                    })}
                    {createPortal(
                        <div onClick={closeModal} className={styles.modal_background} />,
                        document.body
                    )}
                </motion.div>
                <Image className={"fixed right-0 mt-1 mr-2 z-10"} src="/exit.svg" alt="exit" width={17} height={20} onClick={closeModal} />
            </>
            }
            {
            !navModal &&
            <motion.div 
            key="nav"
            variants={variants}
            initial = "hidden"
            animate = "visible"
            exit="hidden"
            transition={{duration: 0.25, ease: "easeInOut"}}
            className={clsx("fixed top-0 w-screen border-b-4 z-10", styles.module)}>
                <Image className={"pl-1"} src="/header-logo.png" alt="dnd-spells-logo" width={58} height={38} priority={true}/>
                <SearchInput placeholder={''} value={searchTerms[0].value}
                onChange={searchTerms[0].changeHandler}/>
                <Image src="/hamburger_icon.svg" alt="hamburger-icon" width={17} height={20} className='mr-4' onClick={openModal} />
            </motion.div>
            }
        </AnimatePresence>
        </>
    )
}