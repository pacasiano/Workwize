

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useParams  } from 'react-router-dom';

export default function NewSubtask({showAddSubtask, setAddSubtask}) {

    NewSubtask.propTypes = {
        setAddSubtask: PropTypes.func,
        showAddSubtask: PropTypes.object.isRequired,
    };

    const { id } = useParams();
   
    return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none backdrop-brightness-90 focus:outline-none select-none">
        <div className="relative bg-white rounded-xl w-96 h-96 p-10">
            <div onClick={()=> setAddSubtask({ show: false, data: {} })} className="absolute top-3 right-3 hover:cursor-pointer">
                <FontAwesomeIcon icon={faCircleXmark} className="text-black/60 text-xl" />
            </div>
            New Subtask
        </div>
    </div>
    )
}

