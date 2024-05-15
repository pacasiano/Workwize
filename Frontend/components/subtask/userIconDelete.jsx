
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

// Context Imports
import { ReloadContext } from "../../context/contexts"
import { useContext } from 'react';

import { toast } from 'react-toastify';

function Delete({user}) {

    Delete.propTypes = {
        user: PropTypes.object.isRequired
    }

    const { reload, setReload } = useContext(ReloadContext);
    const { subtask_id } = useParams();
    const [show, setShow] = useState(false);

    const showSet = () => {
        setShow(!show);
    }

    const delUser = () => {
        console.log('delete user')
        console.log(user.user_id)
        console.log(subtask_id)

        fetch(`http://localhost:8000/user-subtasks/${user.user_id}/${parseInt(subtask_id)}/`, {
            method: 'DELETE',
        })
        .then(() => {
            console.log('Deleted')
            setReload(!reload);
        })
        .catch(err => console.error(err));

        toast.success(`${user.username} has been removed from the subtask`);
        setReload(!reload);

    }

    return (
        <div onMouseEnter={showSet} onMouseLeave={showSet} className={`relative transition-all rounded-full  h-8 text-center flex flex-row items-center justify-center hover:scale-105 select-none bg-orange-300`}>
            <div className={`flex flex-row justify-evenly items-center gap-1 w-12 px-2 ${!show && "w-8"} font-bold font-mono text-black`}>{user.username.charAt(0) || ""}
            {show && 
            <button onClick={delUser} >
                <FontAwesomeIcon className={` ${show ? 'block' : 'hidden'} hover:cursor-pointer hover:scale-105 `} icon={faXmarkSquare} />
            </button>
            }
            </div>
            {show && (
            <div className='absolute -top-5 rounded-md px-2 drop-shadow-md '>
                <div className='rounded-md px-2 bg-orange-300 -mt-2'>
                    {user.username}
                </div>
            </div>
            )}
        </div>
    )
}

export default Delete;