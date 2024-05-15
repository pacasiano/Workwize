

import { Cancel } from "../../assets/icons"
import { AddUser } from "../../context/addUser"
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { UserAdd } from "../../assets/icons";
import PropTypes from "prop-types"
import { ReloadContext } from "../../context/contexts"

export default function NewUser() {

    NewUser.propTypes = {
        reload: PropTypes.bool,
        setReload: PropTypes.func
    };

    const { id } = useParams();
    const { reload, setReload } = useContext(ReloadContext)
    const {setAddUser} = useContext(AddUser)
    const [idsOfUsers, setIdsOfUsers] = useState([])
    const [users, setUsers] = useState([])

    const { handleSubmit } = useForm();

    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedRole, setSelectedRole] = useState(null)

    useEffect(() => {
        // Fetch users in user-projects where project_id = id
        fetch(`http://localhost:8000/api/user-projects/`)
        .then(res => res.json())
        .then(data => {
            // get all users where project_id = id
            let users = data.filter(user => user.project_id === parseInt(id))
            setIdsOfUsers(users)
            // console.log(users)
        });
    }, [id, reload])

    useEffect(() => {
        // Fetch users in users where user_id = idsOfUsers.user_id
        fetch(`http://localhost:8000/api/users/`)
        .then(res => res.json())
        .then(data => {
            // gets all users where user_id is not in idsOfUsers, then sets the value and label to username and user_id respectively
            let users = data.filter(user => !idsOfUsers.some(id => id.user_id === user.user_id)).map((user) => {
                return { value: user.user_id, label: user.username }
            })
            setUsers(users)
        });
    
    }, [id, idsOfUsers, reload])

    const onSubmit = () => {

        if (selectedUser === null || selectedRole === null) {
            toast.error("Please fill up all fields")
            return
        }

        fetch(`http://localhost:8000/api/user-projects/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({project_id: id, user_id: selectedUser, role: selectedRole})
        })
        .then(res => res.json())
        .then(data => {
            setAddUser(false)
            console.log(data)
            toast.success(`User added to project`)
        })
        setReload(!reload)
        
    }

    return (    
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none backdrop-brightness-90 focus:outline-none select-none">
        <div className="relative flex flex-col gap-4 bg-white rounded-xl w-96 px-10 py-6">
            <div onClick={()=> setAddUser(false)} className="absolute cursor-pointer hover:scale-110 top-3 right-3">
                <Cancel />
            </div>
            <div className="text-md font-semibold">
                Add User
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 justify-center items-start">
                <div className="flex flex-row gap-1 w-full">
                    <div className="flex flex-col gap-1 justify-center items-start w-1/2">
                        <div className="text-sm text-gray-500">user</div>
                        <Select onChange={(e)=> setSelectedUser(e.value)} className="w-full" placeholder={"user"} options={users} />
                    </div>
                    <div className="flex flex-col gap-1 justify-center items-start w-1/2">
                        <div className="text-sm text-gray-500">Role</div>
                        <Select onChange={(e)=> setSelectedRole(e.value)} className="w-full" placeholder={"role"} options={[{ value: 'member', label: 'member' },{ value: 'manager', label: 'manager' }]} />
                    </div>
                </div>
                <button type="submit" className="flex flex-row justify-between items-center gap-2 bg-neutral-800/20 px-2 py-1 rounded-md hover:bg-neutral-700/30" ><UserAdd /> Confirm</button>
            </div>
            </form>
            
        </div>
    </div>
    )
}