

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import Delete from './userIconDelete';

// Context Imports
import { ReloadContext } from "../../context/contexts"
import { useContext } from 'react';

import { toast } from 'react-toastify';
import { set } from 'react-hook-form';

export default function UserIcon() {

    const { id, subtask_id } = useParams();
    const [show, setShow] = useState(true);

    // context
    const { reload, setReload } = useContext(ReloadContext);
    
    // the user data
    const [user_ids_in_subtask, setUser_ids_in_subtask] = useState([]);
    const [user_ids_in_project, setUser_ids_in_project] = useState([]);
    const [usersInProject, setUsersInProject] = useState([]);
    const [usersInSubtask, setUsersInSubtask] = useState([]);

    // data to be handled
    const [initial, setDefault] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
    fetch(`http://localhost:8000/api/user-subtasks/`)
        .then(res => res.json())
        .then(data => {
            const filteredUsers = data.filter(user => user.subtask_id === parseInt(subtask_id));
            setUser_ids_in_subtask(filteredUsers);
        });

    fetch(`http://localhost:8000/api/user-projects/`)
        .then(res => res.json())
        .then(data => {
            const filteredUsers = data.filter(user => user.project_id === parseInt(id));
            setUser_ids_in_project(filteredUsers);
        });
    
    }, [subtask_id, id, reload]);

    useEffect(() => {

        fetch(`http://localhost:8000/api/users/`)
        .then(res => res.json())
        .then(data => {
            // filter the users that are in the project
            const UsersInProject = data.filter(user =>
                user_ids_in_project.some(userIdObj => userIdObj.user_id === user.user_id)
            );
            setUsersInProject(UsersInProject);
            // filter the users that are already assigned to this subtask
            const UsersInSubtask = data.filter(user =>
                user_ids_in_subtask.some(userIdObj => userIdObj.user_id === user.user_id)
            );
            setUsersInSubtask(UsersInSubtask);
        });
    
    }, [user_ids_in_project, user_ids_in_subtask, reload]);

    useEffect(() => {
        // setDefault, if user in subtask, remove it from project list
        const initialData = usersInProject.map(user => {
            if (usersInSubtask.some(u => u.user_id === user.user_id)) {
                return null;
            }
            return {value: user.user_id, label: user.username};
        }
        ).filter(user => user !== null);
        setDefault(initialData);

    }, [usersInProject, usersInSubtask, reload]);

    const onsubmit = () => {
        
        // if initial.value is not in user_ids_in_subtask, add it
        selected.forEach(user => {
            fetch('http://localhost:8000/api/user-subtasks/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user_id: user.value,
                    subtask_id: subtask_id
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log("Added user to subtask")
                setReload(!reload);
                console.log(data)
            });
        })
        
        toast.success('User has been added to subtask successfully!');
        setSelected([]);
        setReload(!reload);
    }

    return (
        <div className="">
            <div className='flex flex-row gap-1 flex-wrap w-full'>
                {usersInSubtask.map((user, index) => (
                <div key={index} >
                    <Delete user={user} />
                </div>
                ))}

                <div onClick={()=>setShow(!show)} className="group select-none bg-[#4CAF50]/80 hover:bg-[#4CAF50] rounded-full w-8 h-8 text-center flex flex-row items-center justify-center hover:scale-105 hover:cursor-pointer">
                    <div className="font-bold font-mono text-black/50 group-hover:text-black">+</div>
                </div>
            </div>

            {!show && (
            <div>            
                <div className={` flex flex-col absolute z-50 gap-3 outline focus-within:drop-shadow-2xl outline-0 group rounded-md shadow-xl p-6 bg-slate-50`}>
                    <div onClick={()=> setShow(!show)} className="absolute right-3 top-1 text-black/50 hover font-bold hover:scale-125 cursor-pointer">
                        x
                    </div>
                    <div className='flex flex-row gap-1'>
                    {selected.map((user, index) => (
                    <div key={index} className="rounded-full w-8 h-8 text-center flex flex-row items-center justify-center hover:scale-105 hover:cursor-pointer bg-orange-300">
                        <div className="font-bold font-mono text-black">{user.label.charAt(0)}</div>
                    </div>
                    ))}
                    </div>
                    <div className='flex flex-row gap-2'>
                        <div className="relative w-64 h-36">
                            
                            <div className='absolute z-10 -top-3 left-3 translate-y-[9px] bg-white h-1'><div className='-translate-y-[7px] text-sm'>Select Users</div></div>
                            <Select
                                value={selected}
                                onChange={(e) => setSelected(e)}
                                isMulti
                                name="users"
                                options={initial}
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>
                        <button onClick={onsubmit} className="bg-blue-900/80 h-10 rounded-[4px] text-white w-20 hover:bg-blue-900/90 text-sm">Add</button>
                    </div>
                </div>
            </div>
            )}

        </div>
    )
}