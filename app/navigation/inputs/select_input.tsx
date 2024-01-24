import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Select, { ActionMeta, ControlProps, IndicatorsContainerProps, MultiValue, components } from 'react-select';
import styles from './select_input.module.scss'
import clsx from 'clsx';
import Image from 'next/image';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

interface Size {
    width: number,
    height: number
}

export type SelectInputProps = {
    options: any[]
    onChange: (value: string) => void
}

// const loadOptions = (
//     inputValue: string,
//   ) => {
//     setTimeout(() => {
//       console.log(inputValue);
//     }, 1000);
//   };


export default function SelectInput({options, onChange}: SelectInputProps) {
    const [size, setSize] = useState(0);
    const [height, setHeight] = useState(0);
    const [change, setChange] = useState(false);
    const border = useRef<HTMLImageElement>(null);
  
    const input = useCallback((node: HTMLInputElement | null) => {
      if (node !== null) {
        setSize(node.getBoundingClientRect().width);
        setHeight(node.getBoundingClientRect().height);
      }
    }, [change]);

    useEffect(() => {
        if (border.current !== null) {
            border.current.style.width = `${size - (size * 0.1)}px`;
            border.current.style.height = `${height + (height * 0.2)}px`;
        }
    }, [size, height]);
    
    const Control = ({ children, ...props } : ControlProps) => {
        return (
            <components.Control {...props} innerRef={input}>
            {children}
            </components.Control>
        )
    };

    const IndicatorsContainer = ({ children, ...props } : IndicatorsContainerProps) => {
        return (
            <components.IndicatorsContainer {...props}>
                <Image className={styles.search_icon} src="/dropdown_icon.svg" alt="search-icon" width={16} height={16} priority={true}/>
            </components.IndicatorsContainer>
        )
    }

    return (
        <div className={styles.input_container}>
            <Image src="/border.svg" alt="border" priority={true} className={clsx(styles.border)} width={220} height={37} ref={border} />
            <Select
                isMulti
                unstyled
                name="colors"
                options={options}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                placeholder=""
                isClearable={false}
                className={styles.input}
                onChange={(value, action) => setChange(!change)}
                components={{ Control, IndicatorsContainer }}
                classNames={{
                    control: (state) => clsx(styles.select_control),
                    container: (state) => clsx(styles.select_container),
                    valueContainer: (state) => clsx(styles.select_valueContainer),
                    multiValue: (state) => clsx(styles.select_multiValue),
                    menu: (state) => clsx(styles.select_menu),
                    indicatorsContainer: (state) => clsx(styles.select_indicatorsContainer),
                }} />
        </div>
    )
};
