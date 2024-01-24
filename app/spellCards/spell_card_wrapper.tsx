import clsx from 'clsx';
import styles from './spell_card_wrapper.module.scss';
import SpellCard from './spellCard/spell_card';
import { useInView } from 'react-intersection-observer';
import { useContext, useEffect, useState } from 'react';
import { reducerContext } from '../reducer/NavReducer';
import { useSearchParams } from 'next/navigation';
import getSpells from '@/lib/spells';
import { getParamString, useDidUpdateEffect } from '../utils';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface SpellCardWrapperProps {
    className?: string
    spells: any[]
}

export default function SpellCardWrapper({spells, className}: SpellCardWrapperProps) {
    const { ref, inView } = useInView({triggerOnce: true});
    const { state, dispatch } = useContext(reducerContext);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if (inView) {
            dispatch({type: "nextPage"});
            
            const params = getParamString({...state.params, page: state.page + 1});
            getSpells(params).then((data) => {
                dispatch({type: "addSpells", payload: data.results});
            }).catch((err) => {
                //end of spells
                console.log(err);
            });
        }
    }, [inView]);

    useEffect(() => {
        if (state.params) {
            const params = getParamString({...state.params, page: state.page});
            getSpells(params).then((data) => {
                dispatch({type: "setSpells", payload: data.results});
            });
        }
    }, [state.params]);

    return (
        <div className={clsx(styles.container, className)}>
            {spells.map((spell: any, index: number) => (
                <React.Fragment key={spell._id}>
                    <SpellCard spell={spell}/>
                    {index == spells.length - 10 && <span  ref={ref} className='pb-[1rem]'></span>}
                </React.Fragment>
            ))
            }
        </div>
    );
}