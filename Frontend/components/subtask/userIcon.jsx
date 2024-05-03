

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UserIcon() {

    const { subtask_id } = useParams();
    const [initials, setInitials] = useState([]); // [ 'AB', 'CD', 'U' ]
    const [users_ids, setUsers_ids] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
    fetch(`http://localhost:8000/api/user-subtasks/`)
        .then(res => res.json())
        .then(data => {
            const filteredUsers = data.filter(user => user.subtask_id === parseInt(subtask_id));
            setUsers_ids(filteredUsers);
        });
    }, [subtask_id]);

    useEffect(() => {

        fetch(`http://localhost:8000/api/users/`)
        .then(res => res.json())
        .then(data => {
            // find users where data.user_id === usersID.user_id usersID is an array
            const filteredUsers = data.filter(user =>
                users_ids.some(userIdObj => userIdObj.user_id === user.user_id)
            );
            setUsers(filteredUsers);
        });
    
    }, [users_ids]);

    // get the initials of the user from first name and last name then concatenate
    // the initials and return the initials
    // if the user has no first name or last name return the first letter of the username
    // if the user has no username return 'U'
    useEffect(() => {
        if (users.length === 0) return;
    
        const userInitials = users.map(user => {

            let initials = '';
            if (user.firstName) {
                initials += user.firstName.charAt(0);
            }
            if (user.lastName) {
                initials += user.lastName.charAt(0);
            }

            if (initials === '' && user.username) {
                initials = user.username.charAt(0);
            }
            
            if (initials === '') {
                initials = 'U';
            }
    
            return initials;
        });
    
        setInitials(userInitials);
    }, [users]);

    return (
        <div className="flex flex-row gap-1 flex-wrap w-full">

            {initials.map((user, index) => (
            <div key={index} className="rounded-full w-8 h-8 text-center flex flex-row items-center justify-center hover:scale-105 hover:cursor-pointer bg-orange-300">
                <div className="font-bold font-mono text-black">{user}</div>
            </div>
            ))}

            <div className="group bg-[#4CAF50]/80 hover:bg-[#4CAF50] rounded-full w-8 h-8 text-center flex flex-row items-center justify-center hover:scale-105 hover:cursor-pointer">
                <div className="font-bold font-mono text-black/50 group-hover:text-black">+</div>
            </div>

            {/* add user modal + remove user modal */}

        </div>
    )
}