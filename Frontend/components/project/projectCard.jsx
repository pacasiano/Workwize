
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as starFilled } from "@fortawesome/free-solid-svg-icons";
import { faStar as starEmpty } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

// Context Imports
import { ReloadContext } from "../../context/contexts";
import { useContext } from 'react';

export default function ProjectCard({data, type}) {

    ProjectCard.propTypes = {
        data: PropTypes.object.isRequired,
        type: PropTypes.number
    };

    const { reload, setReload } = useContext(ReloadContext);

    const [hovered, setHovered] = useState(false)
    const [star, setStar] = useState(data.isStarred)

    const checkHover = () => {
        if(hovered===true){
            setHovered(false)
        }else{
            setHovered(true)
        }
    }

    const setNot = () => {
        //dapat ma set sa database na false
        fetch(`http://localhost:8000/api/projects/${data.project_id}/`,{
            method: 'PATCH',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({isStarred: false})
        })
        .then(res => {res.json()})
        .catch(error => {console.error(error)})
        setStar(false)
        setReload(!reload)
    }

    const setYes = () => {
        //dapat ma set sa database na true
        fetch(`http://localhost:8000/api/projects/${data.project_id}/`,{
            method: 'PATCH',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({isStarred: true})
        })
        .then(res => {res.json()})
        .catch(error => {console.error(error)})
        setStar(true)
        setReload(!reload)
    }

    return (
    <>
        {type === 1 ? (
        <div className="p-5 h-28 group bg-neutral-200 hover:bg-neutral-400 hover:cursor-pointer hover drop-shadow-sm rounded-md w-56 select-none">
            <div className="flex flex-col justify-center items-center h-full gap-2">
                <div  className="text-md font-light text-black/50 group-hover:text-black">
                    Add new Poject
                    
                </div>
            </div>
        </div>
        ) : (
        
        <div onMouseEnter={checkHover} onMouseLeave={checkHover} className="relative h-28 w-56 text-white bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer rounded-md overflow-hidden" style={{backgroundColor: data.background}}>
            <Link to={`${data.project_id}`}>
                <div className=" p-5">
                    <div className="flex flex-col gap-2">
                        <div  className="text-xl font-bold">
                            {data.project_name}
                        </div>
                    </div>
                </div>
            </Link>
            {hovered ? (
                <div className="absolute transition-all bottom-2 right-3">
                {!star ? 
                    (
                    <button onClick={setYes} className="hover:cursor-pointer scale-100 hover:scale-125 active:scale-105 ">
                        <FontAwesomeIcon className="text-whtie " icon={starEmpty} />
                    </button>
                    ) : (
                    <button onClick={setNot} className="hover:cursor-pointer hover:scale-125 active:scale-105">
                        <FontAwesomeIcon className="text-white " icon={starFilled} />
                    </button>
                    )
                }
                </div>
            ) : (
                <div className="absolute transition-all bottom-2 -right-5">
                {!star ? 
                    (
                    <FontAwesomeIcon className="text-white" icon={starEmpty} />
                    ) : (
                    <FontAwesomeIcon className="text-white" icon={starFilled} />
                    )
                }
                </div>
            )}
        </div>
        
        )}
    </>
    )
}