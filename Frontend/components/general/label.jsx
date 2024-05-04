import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useState } from "react";

export default function Label({tag_id, word, color, type, reload, setReload}) {

    Label.propTypes = {
        tag_id: PropTypes.number,
        word: PropTypes.string,
        color: PropTypes.string,
        type: PropTypes.string,
        reload: PropTypes.bool,
        setReload: PropTypes.func
    }; 

    const [isHovered, setIsHovered] = useState(false);

    function delTag() {
        fetch(`http://localhost:8000/api/labels/${parseInt(tag_id)}/`, {
            method: 'DELETE',
        })
        .then(() => {
            console.log('Deleted')
            setReload(!reload);
        })
        .catch(err => console.error(err));

        
    }

    if (type === "2"){
        return (
        <div className="relative select-none ">
            <div className={` flex flex-row justify-center items-center gap-1 group text-white w-full px-2 py-1 rounded-md `} style={{ background: color }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
                {word}
                <button onClick={delTag} >
                <FontAwesomeIcon className={` ${isHovered ? 'block' : 'hidden'} hover:cursor-pointer hover:scale-105 `} icon={faXmarkSquare} />
                </button>
            </div>
        </div>
        )
    } else if (type === "3"){
        return (
        <div className="relative ">
            <div className={` flex flex-row justify-center items-center gap-1 group text-white w-full px-2 py-1 rounded-md `} style={{ background: color }}>
                {word}
            </div>
        </div>
        )
    } else {
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

}