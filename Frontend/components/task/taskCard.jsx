import PropTypes from 'prop-types';
import Label from '../general/label';
import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCirclePlus, faCaretDown, faCircleMinus } from '@fortawesome/free-solid-svg-icons'; 
//import Circle from '@uiw/react-color-circle';
import Compact from '@uiw/react-color-compact';
import Labels from '../../data/Label';

export default function TaskCard({data, setWindow, setChosenProj}) {

    TaskCard.propTypes = {
        data: PropTypes.object.isRequired,
        setWindow: PropTypes.func,
        setChosenProj: PropTypes.func,
    };

    const [add, setAdd] = useState(true)
    const [tagName, setTagName] = useState('');
    const [hex, setHex] = useState('#F44E3B');

    const showadd = () => {
        if(add===true) {setAdd(false)} else {setAdd(true)}
    }

    const [colors] =  useState([
       '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#1A73E8', '#FF6F00', '#4CAF50', '#9C27B0'
    ])

    const addTag = (e) => {
        e.preventDefault();
        //instaed of setStates, update the database of the changes to the users states
        let newTag = { word: tagName, color: hex}
        data.states.push(newTag)
        console.log(data)
        setTagName("")
        setHex("#FFFFFF")
        showadd()
    }

    const setPage = () => {
        setChosenProj(data)
        setWindow("Task")
    }

    // filter the labels that are in the Subtask with the same task_id
    const labels = Labels.filter((label) => label.subtask_id === data.subtask_id)

    return (
        <div className="flex flex-row gap-0 ">
            <div className="flex flex-col gap-2 bg-white/70 shadow-md rounded-md w-56">
                <div className="px-5 pt-5">
                    <div className="flex justify-between gap-1">
                        <div className="flex flex-wrap gap-1 items-center w-full">
                            {labels.map((tag, index) => (
                                <Label key={index} word={tag.name} color={tag.color} />
                            ))}
                        </div>
                        {/* The add button for tags */}
                        {/* <div className="group relative w-min h-min select-none">
                            {add ?
                            <FontAwesomeIcon onClick={showadd} className="text-xl text-black/20 group-hover:text-black/80 hover:cursor-pointer" icon={faCirclePlus} />
                            :
                            <FontAwesomeIcon onClick={showadd} className="text-xl text-red-900/80 hover:cursor-pointer" icon={faCircleMinus} />
                            }
                            <div  className={` hidden absolute group-hover:block -translate-y-[53px] -translate-x-2 rounded-md px-2 ${add ? "bg-black" : "bg-red-900"} `}>
                                <FontAwesomeIcon className={` absolute -z-10 size-5 translate-y-[10px] ${add ? "text-black" : "text-red-900"} `} icon={faCaretDown} />
                                <p className="z-50 text-white font-thin text-sm whitespace-nowrap ">{add ? "add tag" : "exit"}</p>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div onClick={()=> setPage()} className="hover:cursor-pointer">
                    <div className="pb-5 px-5 flex flex-col gap-2">
                        <div  className="text-xl font-bold">
                            {data.subtask_name}
                        </div>
                        <p className=" overflow-wrap break-words font-light">
                            {data.description}
                        </p>
                        {/* <div className="flex flex-col gap-1">
                            <div className="flex flex-row gap-1 items-center">
                                <p className="text-black/50 text-sm font-light">created:</p>
                                <p className="text-black/50 font-thin text-sm">{data.start}</p>
                            </div>
                            <div className="flex flex-row gap-1 items-center">
                                <p className="text-black/50 text-sm font-light">deadline:</p>
                                <p className="text-black/50 font-thin text-sm">{data.end}</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className=" bg-black/10 text-black max-h-32 h-[90%] translate-y-[5%] w-64 py-2 rounded-r-md w-47" hidden={add} >
                <form className="" onSubmit={addTag}>
                <div className="px-2 text-sm h-full flex flex-col gap-1 justify-center">
                    <div className="text-black/80 font-light">
                        <input onChange={(e) => setTagName(e.target.value)} value={tagName} className="w-full -translate-y-1 outline-none bg-inherit border-b-2 border-black/20 placeholder:font-normal placeholder:text-md placeholder:text-black/40 " placeholder="name..." />
                    </div>
                    <div className="text-black/40 font-normal">

                        <Compact
                        className=""
                        colors={colors}
                        color={hex}
                        onChange={(color) => {setHex(color.hex);}}
                        />

                        {/* <Circle
                        className="pt-1"
                        colors={colors}
                        color={hex}
                        onChange={(color) => {
                            setHex(color.hex);
                        }}
                        /> */}

                    </div>
                    <button type="submit" className="bg-green-900/70 text-white px-2 rounded-sm font-light">
                        submit
                    </button>
                </div>
                </form>
            </div>
        </div>
    )    
}