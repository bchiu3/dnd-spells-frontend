import { motion } from "framer-motion";
import style from "./check_input.module.scss"

type CheckInputProps = {
    value: boolean,
    onChange: (value: boolean) => void
}

export default function CheckInput({value, onChange}: CheckInputProps) {
    return (
        <motion.div className={style.gradient_container}>
                <motion.div className={style.modal_container} onClick={(e) => e.stopPropagation()}>

                </motion.div>
        </motion.div>
    ) 
}