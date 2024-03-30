import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useState } from "react";

export default function Tag({word, color}) {

    Tag.propTypes = {
        word: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
    }; 

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative">
            <div className={`  group w-9 text-white h-2 rounded-md hover:cursor-pointer `} style={{ background: color }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            </div>
            <div className={` absolute ${isHovered ? 'block' : 'hidden'} -translate-y-10 translate-x-1 min-w-[28px] rounded-md px-2 `} style={{ background: color }}>
                <FontAwesomeIcon className={` absolute -z-10 size-5 translate-y-[11px] -translate-x-[4px] `} style={{ color: color }} icon={faCaretDown} />
                <p className="z-50 font-thin text-sm whitespace-nowrap">{word}</p>
            </div>
        </div>
    )
}