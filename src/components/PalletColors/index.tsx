import React, { useState } from 'react';

import { motion } from "framer-motion";
import './styles.css'
import { MdColorLens } from 'react-icons/md';

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};
interface IProps {
    onChange: (value: string) => void;
    smallIcon?: boolean;
}
const PalletColors: React.FC<IProps> = ({ onChange, smallIcon = false }) => {
    const [visible, setVisible] = useState(false);
    const colors = ["#BAE2FF", "#B9FFDD", "#FFE8AC", "#FFCAB9", "#F99494", "#9DD6FF", "#ECA1FF"]

    const setColor = (color: string) => {
        onChange(color);
        setVisible(false);
    }

    return (
        <div className='wrapper'>
            <div className='main'>
                {visible && (
                    <motion.ul
                        className="containerMotion"
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >
                        {colors.map((index) => (
                            <motion.li
                                onClick={() => setColor(index)}
                                key={index}
                                style={{ backgroundColor: index }}
                                className="item"
                                variants={item}
                            />
                        ))}
                    </motion.ul>
                )}
                <button
                    className='buttonPickColor'
                    onClick={() => {
                        setVisible(!visible)
                    }}
                    // onBlur={() => setVisible(false)}
                >
                    <MdColorLens size={smallIcon ? 32: 42} />
                </button>
            </div>
        </div>
    );
}

export default PalletColors;