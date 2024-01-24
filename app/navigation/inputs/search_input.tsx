import clsx from 'clsx';
import styles from '../navigation.module.scss';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { reducerContext } from '@/app/reducer/NavReducer';

interface Size {
    width: number,
    height: number
}

export interface SearchInputProps {
    placeholder: string,
    onChange: (value: string) => void
}

export default function SearchInput({placeholder, onChange}: SearchInputProps) {
    const [width, setWidth] = useState(0);
    const border = useRef<HTMLImageElement>(null);
    const search = useRef<HTMLImageElement>(null);
  
    const input = useCallback((node: HTMLInputElement | null) => {
      if (node !== null) {
        setWidth(node.getBoundingClientRect().width);
      }
    }, []);

    useEffect(() => {
        if (border.current !== null) {
            border.current.style.width = `${width - (width * 0.1)}px`;
        }
        if (search.current !== null) {
            search.current.style.transform = `translateX(${(width/2) - (width * 0.1)}px)`
        }
    }, [width]);

    return (
        <div className={styles.input_container}> 
            <Image src="/border.svg" alt="border" priority={true} className={clsx(styles.border)} width={220} height={37} ref={border}/>
            <input type="text" className={styles.search} placeholder={placeholder} ref={input} onChange={(e) => onChange(e.target.value)}/>
            <Image className={styles.search_icon} src="/search_icon.svg" alt="search-icon" width={16} height={16} ref={search} priority={true}/>
        </div>
    );
}