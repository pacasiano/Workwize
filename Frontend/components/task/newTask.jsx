
import { useState } from 'react';
import Label from '../general/label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import List from './newTaskList';
import Tags from './newTaskLabel';

import UserProject from '../../data/UserProject';
import User from '../../data/User';

export default function NewTask({projectInfo, showAddProj, setAddProj}) {

    NewTask.propTypes = {
        setAddProj: PropTypes.func,
        showAddProj: PropTypes.object.isRequired,
        projectInfo: PropTypes.object.isRequired,
    };

    // get Users from UsersProject where project_id is projectInfo.project_id
    const userIds = UserProject.filter((user) => user.project_id === projectInfo.project_id)
    // get the names of the users in Users data by using user_id from userIds
    const users = userIds.map((user) => User.find((u) => u.user_id === user.user_id))

    // get the users from the database
    const [unAssgined, setUnAssgined] = useState([
        // show all users in the project
        ...users.map((user) => user.username)
    ])

    const [assigned, setAssigned] = useState([])

    const assignUser = (name) => {
        setAssigned([...assigned, name]);
        setUnAssgined(unAssgined.filter(n => n !== name));
    };

    const unassignUser = (name) => {
        setUnAssgined([...unAssgined, name]);
        setAssigned(assigned.filter(n => n !== name));
    };
    
    const [chosenTags, setChosenTags] = useState([
        {
            word: "try",
            color: "#10B981"
        }
    ])
    const [chosenList, setChosenList] = useState({name: showAddProj.data.name, color: showAddProj.data.color }||{})

    const [task, setTask] = useState({
        name: "",
        desc: "",
        start: showAddProj.data.start || "",
        end: showAddProj.data.end || "", 
        states: "",
        list: "",
        assigned: ""
    })

    const addTask = () => {
        //instaed of setStates, update the database of the changes to the users states
        task.states = chosenTags
        task.assigned = assigned
        task.list = chosenList
        console.log(task)
        // data.push(task)
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
                                <label>Task Name</label>
                                <input type='text' onChange={(e) => setTask({ ...task, name: e.target.value})} className=" outline focus-within:outline-1 outline-0 bg-neutral-100 rounded-md w-60 h-10 p-2" placeholder="Task Name" />
                            </div>
                            <div className="flex flex-col">
                                <label>Task Description</label>
                                <textarea onChange={(e) => setTask({ ...task, desc: e.target.value})} className="outline focus-within:outline-1 outline-0 bg-neutral-100 rounded-md h-20 w-60 resize-none p-2" placeholder="Task Description" />
                            </div>
                            <div className="flex flex-col">
                                <label>Task start date</label>
                                <input type='date' value={task.start} onChange={(e) => setTask({ ...task, start: e.target.value})} className="outline focus-within:outline-1 outline-0 placeholder:text-neutral-400 bg-neutral-100 rounded-md w-60 h-10 p-2" />
                            </div>
                            <div className="flex flex-col">
                                <label>Task end date</label>
                                <input type='date' value={task.end} onChange={(e) => setTask({ ...task, end: e.target.value})} className="outline focus-within:outline-1 outline-0 placeholder:text-neutral-400 bg-neutral-100 rounded-md w-60 h-10 p-2" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-62">
                            <div className="flex flex-col">

                                <label>Assigned users</label>
                                {/* assigned */}
                                <div className="flex flex-wrap gap-1 py-1 w-60">
                                    {assigned.length === 0 ? <p className="text-xs font-light">No users assigned</p> : null}
                                    {assigned.map((name, index) => (
                                        <div key={index} onClick={() => unassignUser(name)} className="hover:cursor-pointer">
                                            <Label word={name} type={"3"} color="#10B981" />
                                        </div>
                                    ))}
                                </div>
                                {/* not assigned */}
                                <hr />
                                <div className="flex flex-wrap gap-1 py-1 w-60">
                                    {unAssgined.length === 0 ? <p className="text-xs font-light">All users have been assigned</p> : null}
                                    {unAssgined.map((name, index) => (
                                        <div key={index} onClick={() => assignUser(name)} className="hover:cursor-pointer">
                                            <Label word={name} type={"3"} color="#F47174" />
                                        </div>
                                    ))}
                                </div>
                                
                            </div>

                            <List chosenList={chosenList} setChosenList={setChosenList} />
                        
                            <Tags chosenTags={chosenTags} setChosenTags={setChosenTags} />
                            
                        </div>
                    </div>
                    <div onClick={addTask} className="pt-2">
                        <button className="bg-blue-900/80 text-white w-60 h-10 rounded-md hover:bg-blue-900/90">Create Task</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

