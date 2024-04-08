import Compact from '@uiw/react-color-compact';
import { useState } from 'react';
import Tag from '../general/tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export default function NewTask({data, showAddProj, setAddProj}) {

    NewTask.propTypes = {
        setAddProj: PropTypes.func.isRequired,
        showAddProj: PropTypes.object.isRequired,
        data: PropTypes.array.isRequired,
    };

    const colors = [
        '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#1A73E8', '#FF6F00', '#4CAF50', '#9C27B0'
    ]

    const [chosenTags, setChosenTags] = useState([
        {
            word: "try",
            color: "#10B981"
        }
    ])

    const [tagName, setTagName] = useState('');
    const [hex, setHex] = useState('#F44E3B');

    const [task, setTask] = useState({
        name: "",
        desc: "",
        start: showAddProj.data.start,
        end: showAddProj.data.end,
        states: "",
    })

    const addTag = () => {
        //instaed of setStates, update the database of the changes to the users states
        setChosenTags([...chosenTags, { word: tagName, color: hex}]);
        setTagName("")
        setHex("#FFFFFF")
    }

    const addTask = () => {
        //instaed of setStates, update the database of the changes to the users states
        console.log(task)
        task.states = chosenTags
        data.push(task)
        setAddProj(false)
    }

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none backdrop-brightness-90 focus:outline-none select-none">
            <div onClick={()=> setAddProj(false)} className="fixed md:translate-x-60 md:-translate-y-44 translate-x-32 -translate-y-64  hover:cursor-pointer">
                <FontAwesomeIcon icon={faCircleXmark} className="text-black/60 translate-x-3 -translate-y-5 md:-translate-y-0 text-xl" />
            </div>
            <div className="bg-white rounded-xl p-10">
                <div className="flex flex-col gap-4 justify-center items-center">
                    <h1 className="font-mono text-2xl border-b-2 text-center border-black/40 w-52">New Task</h1>
                    <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-7 pt-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <label>Project Name</label>
                                <input type='text' onChange={(e) => setTask({ ...task, name: e.target.value})} className=" outline focus-within:outline-1 outline-0 bg-neutral-100 rounded-md w-60 h-10 p-2" placeholder="Project Name" />
                            </div>
                            <div className="flex flex-col">
                                <label>Project Description</label>
                                <textarea onChange={(e) => setTask({ ...task, desc: e.target.value})} className="outline focus-within:outline-1 outline-0 bg-neutral-100 rounded-md h-20 w-60 resize-none p-2" placeholder="Project Description" />
                            </div>
                            <div className="flex flex-col">
                                <label>Project start date</label>
                                <input type='date' value={task.start} onChange={(e) => setTask({ ...task, start: e.target.value})} className="outline focus-within:outline-1 outline-0 placeholder:text-neutral-400 bg-neutral-100 rounded-md w-60 h-10 p-2" />
                            </div>
                            <div className="flex flex-col">
                                <label>Project end date</label>
                                <input type='date' value={task.end} onChange={(e) => setTask({ ...task, deadline: e.target.value})} className="outline focus-within:outline-1 outline-0 placeholder:text-neutral-400 bg-neutral-100 rounded-md w-60 h-10 p-2" />
                            </div>
                        </div>
                        <div className="flex flex-col w-62">
                            <label>Tags</label>
                            <div className="flex flex-wrap gap-1 py-1 w-60">
                                {chosenTags.map((tag, index) => (
                                    <Tag key={index} word={tag.word} color={tag.color} />
                                ))}
                            </div>
                                <div className="flex flex-col outline focus-within:outline-1 outline-0 group rounded-md">
                                    <div className="">
                                        <input onChange={(e)=> setTagName(e.target.value)} value={tagName} className="bg-neutral-100 outline-none rounded-t-md w-60 h-10 pl-2" placeholder="Tag Name" />
                                    </div>
                                    <Compact
                                    className="bg-neutral-100"
                                    colors={colors}
                                    color={hex}
                                    onChange={(color) => {setHex(color.hex);}}
                                    />
                                    <button onClick={addTag} className="bg-blue-900/80 rounded-b-[4px] text-white w-full hover:bg-blue-900/90 text-sm">Add</button>
                                </div>
                        </div>
                    </div>
                    <div onClick={addTask} className="pt-2">
                        <button className="bg-blue-900/80 text-white w-60 h-10 rounded-md hover:bg-blue-900/90">Create Project</button>
                    </div>
                </div>
            </div>
        </div>
    )
}