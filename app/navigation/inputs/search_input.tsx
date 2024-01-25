import clsx from 'clsx';
import styles from './search_input.module.scss';
import { ChangeEventHandler, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { reducerContext } from '@/app/reducer/NavReducer';
import { Laila } from 'next/font/google';
import { sanitizeSearchParams } from '@/app/utils';
import { useDebouncedCallback } from 'use-debounce';

interface Size {
    width: number,
    height: number
}

export interface SearchInputProps {
    placeholder: string,
    onChange: (...args: any) => any
    value: string
    inModal?: boolean
    searchParam?: string
}

const lalia = Laila({ weight: ["400"], style: "normal", subsets: ["latin"] });

export default function SearchInput({placeholder, onChange, value, inModal, searchParam}: SearchInputProps) {
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });
    const [holdValue, setHoldValue] = useState<string>(value);
    const border = useRef<HTMLImageElement>(null);
    const search = useRef<HTMLImageElement>(null);
    searchParam = searchParam || "";
    
    const input = useCallback((node: HTMLInputElement | null) => {
      if (node !== null) {
        setSize({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height});
      }
    }, []);

    useEffect(() => {
        if (border.current !== null) {
            border.current.style.width = `${size.width - (size.width * 0.1)}px`;
            border.current.style.height = `${size.height + (size.height * 0.3)}px`;
        }
        if (search.current !== null) {
            search.current.style.transform = `translateX(${(size.width/2) - (size.width * 0.1)}px)`
        }
    }, [size]);


    const debounced = useDebouncedCallback(onChange, 300);

    onChange = (value: string) => {
        setHoldValue(value);
        return debounced(value);
    };

    return (
        <div className={clsx('flex flex-col gap-[2px] flex-grow', inModal && "flex-grow-0")}>
            {inModal && <div className={clsx(styles.label, lalia.className)}>{sanitizeSearchParams(searchParam)}</div>}
            <div className={clsx(styles.input_container, lalia.className)}> 
                <Image src="/border.svg" alt="border" priority={true} className={clsx(styles.border)} width={220} height={37} ref={border} />
                <input type="text" className={clsx(styles.search, inModal && styles.search_modal)} value={holdValue} placeholder={placeholder} ref={input} onChange={(e) => onChange(e.target.value)}/>
                <Image className={styles.search_icon} src="/search_icon.svg" alt="search-icon" width={16} height={16} ref={search} priority={true}/>
            </div>
        </div>
    );
}