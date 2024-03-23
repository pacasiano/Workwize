import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { faListCheck } from "@fortawesome/free-solid-svg-icons"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { faBorderAll } from "@fortawesome/free-solid-svg-icons"
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import PropTypes from 'prop-types';

export default function Sidebar({Wide, setWide, setWindow}) {

    Sidebar.propTypes = {
        Wide: PropTypes.bool.isRequired,
        setWide: PropTypes.func.isRequired,
        setWindow: PropTypes.func.isRequired
    };

    return (
        <div className={` ${Wide ? ("w-60") : ("w-20")} h-full bg-black/90 transition-all ease-in-out`}>

            {Wide ? (
            <div className="flex flex-col items-start gap-10 justify-start p-8">

                <h1 className="flex flex-row gap-2 text-white text-2xl font-mono"><FontAwesomeIcon className="text-3xl" icon={faFolder} /> Projects</h1>

                <button className="absolute" onClick={()=> setWide(false)}>
                    <FontAwesomeIcon className=" bg-black transform-gpu transition-all ease-in-out hover:scale-110 text-3xl rounded-full text-white translate-x-48" icon={faCircleChevronLeft} />
                </button>

                <div className="transition-all ease-in-out bg-white flex flex-row gap-2 h-10 px-2 justify-center items-center text-black py-2 text-md font-bold tansform-gpu hover:scale-105 hover:cursor-pointer rounded-full">
                    <FontAwesomeIcon className="text-3xl text-green-600/90" icon={faCirclePlus} />
                    <p className="" >New&nbsp;Project</p>
                </div>

                <div className="flex flex-col text-xl gap-3 transition-all ease-in-out">
                    <button onClick={()=> setWindow("Dashboard")} className="flex flex-row gap-2 transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                        <FontAwesomeIcon className="text-2xl" icon={faBorderAll} />Dashboard
                    </button>
                    <button onClick={()=> setWindow("Projects")} className="flex flex-row gap-2 transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                        <FontAwesomeIcon className="text-2xl" icon={faListCheck} />Projects
                    </button>
                    <button onClick={()=> setWindow("Settings")} className="flex flex-row gap-2 tansform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                        <FontAwesomeIcon className="text-2xl" icon={faGear} />Settings
                    </button>
                </div>

            </div>
            ):(
            <div className="flex flex-col items-center gap-10 justify-start pt-8 px-4 transition-all">

                <FontAwesomeIcon className="text-white text-3xl" icon={faFolder} />

                <button className="absolute" onClick={()=> setWide(true)}>
                    <FontAwesomeIcon className=" bg-black transform-gpu transition-all hover:scale-110 text-2xl rounded-full text-white translate-x-10 translate-y-1" icon={faCircleChevronRight} />
                </button>

                <div className="transition-all ease-in-out bg-white flex flex-row gap-2 h-9 px-1 justify-center items-center text-black text-md font-bold tansform-gpu hover:scale-105 hover:cursor-pointer rounded-full">
                    <FontAwesomeIcon className="text-3xl text-green-600/90" icon={faCirclePlus} />
                </div>

                <div className="flex flex-col gap-3 text-2xl transition-all">
                    <button onClick={()=> setWindow("Dashboard")} className="flex flex-row gap-2 transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                        <FontAwesomeIcon icon={faBorderAll} />
                    </button>
                    <button onClick={()=> setWindow("Projects")} className="flex flex-row gap-2 transform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                        <FontAwesomeIcon icon={faListCheck} />
                    </button>
                    <button onClick={()=> setWindow("Settings")} className="flex flex-row gap-2 tansform-gpu hover:scale-105 hover:cursor-pointer items-center text-white py-1 px-2 rounded-md">
                        <FontAwesomeIcon icon={faGear} />
                    </button>
                </div>
                
            </div>
            )}
            
        </div>
    )
}
