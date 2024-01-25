import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Select, { ActionMeta, ControlProps, IndicatorsContainerProps, MultiValue, components } from 'react-select';
import styles from './select_input.module.scss'
import clsx from 'clsx';
import Image from 'next/image';
import { Laila } from "next/font/google"
import { sanitizeSearchParams } from '@/app/utils';

interface Size {
    width: number,
    height: number
}

export type SelectInputProps = {
    options: any[]
    onChange: Function
    value: string
    inModal?: boolean
    searchParam?: string
}

// const loadOptions = (
//     inputValue: string,
//   ) => {
//     setTimeout(() => {
//       console.log(inputValue);
//     }, 1000);
//   };

const lalia = Laila({ weight: ["400"], style: "normal", subsets: ["latin"] });

export default function SelectInput({options, onChange, value, inModal, searchParam}: SelectInputProps) {
    //have to seperate bc onChange being weird
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [change, setChange] = useState(false);
    const border = useRef<HTMLImageElement>(null);
    searchParam = searchParam || "";

    const OptionsMap: {[key:string]: any}= {};
    for (const option of options) {
        OptionsMap[option.value] = option;
    }

    const defaultValues = [];
    for (const options of value.split(',')) {
        defaultValues.push(OptionsMap[options]);
    }
  
    const input = useCallback((node: HTMLInputElement | null) => {
      if (node !== null) {
        setWidth(node.getBoundingClientRect().width);
        setHeight(node.getBoundingClientRect().height);
      }
    }, [change]);

    const onChangeHandler = (newValue: MultiValue<any>) => {
        setChange(!change);
        onChange(newValue.map((option) => option.value).join(','));
    }

    useEffect(() => {
        if (border.current !== null) {
            border.current.style.width = `${width - (width * 0.1)}px`;
            border.current.style.height = `${height + (height * 0.2)}px`;
        }
    }, [width, height]);
    
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
        <div className='flex flex-col gap-[2px]'>  
            <div className={clsx(styles.label, lalia.className)}>{sanitizeSearchParams(searchParam)}</div>
            <div className={clsx(styles.input_container, lalia.className)}>
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
                    className={clsx(styles.input, inModal && styles.input_modal)}
                    defaultValue={defaultValues}
                    onChange={onChangeHandler}
                    components={{ Control, IndicatorsContainer }}
                    classNames={{
                        control: (state) => clsx(styles.select_control, inModal && styles.select_control_modal),
                        container: (state) => clsx(styles.select_container),
                        valueContainer: (state) => clsx(styles.select_valueContainer),
                        multiValue: (state) => clsx(styles.select_multiValue),
                        menu: (state) => clsx(styles.select_menu),
                        indicatorsContainer: (state) => clsx(styles.select_indicatorsContainer),
                    }} />
            </div>
        </div>
    )
};
