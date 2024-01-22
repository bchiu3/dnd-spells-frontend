import styles from './navigation.module.scss';
import clsx from 'clsx';
import Image from 'next/image';

export default function Navigation() {
    return (
        <div className={clsx("fixed top-0 w-full border-b-4 bg-black", styles.module)}>
            <Image src="/header-logo.png" alt="dnd-spells-logo" width={87} height={57}/>
        </div>
    )
}