
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons';


function Delete({user}) {

    Delete.propTypes = {
        user: PropTypes.object.isRequired
    }

    const [show, setShow] = useState(false);

    const showSet = () => {
        setShow(!show);
    }

    const delUser = () => {
        console.log('delete user')

        // fetch(`http://localhost:8000/api/user-subtasks/${user.id}/`, {
        //     method: 'DELETE',
        // })
        // .then(() => {
        //     console.log('Deleted')
        // })
        // .catch(err => console.error(err));


    }

    return (
        <div onMouseEnter={showSet} onMouseLeave={showSet} className={`relative rounded-full  h-8 text-center flex flex-row items-center justify-center hover:scale-105 hover:cursor-pointer bg-orange-300`}>
            <div className={`flex flex-row justify-center items-center gap-1 w-8 ${show && "w-12"} font-bold font-mono text-black`}>{user.username.charAt(0)}
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