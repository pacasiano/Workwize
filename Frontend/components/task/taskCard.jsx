import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Label from '../general/label';

export default function TaskCard({task_id, subtask_data}) {

    TaskCard.propTypes = {
        task_id: PropTypes.number.isRequired,
        subtask_data: PropTypes.object.isRequired,
    };

    const { id } = useParams();
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/labels/`)
        .then(res => res.json())
        .then(data => {
            const filteredLabels = data.filter(label => label.subtask_id === subtask_data.subtask_id);
            setLabels(filteredLabels);
        });
    }, [subtask_data]);    

    return (
        <div className="flex flex-row gap-0 ">
            <div className="flex flex-col gap-2 bg-white/70 shadow-md rounded-md w-56">
                <div className="px-5 pt-5">
                    <div className="flex justify-between gap-1">
                        <div className="flex flex-wrap gap-1 items-center w-full">
                            {labels.map((tag, index) => (
                                <Label key={index} word={tag.label_name} color={tag.color} />
                            ))}
                        </div>
                        {/* The add button for tags */}
                    </div>
                </div>
                <Link to={`/project/${id}/tasks/${task_id}/subtask/${subtask_data.subtask_id}`} relative='path' className="hover:cursor-pointer">
                    <div className="pb-5 px-5 flex flex-col gap-2">
                        <div  className="text-xl font-bold">
                            {subtask_data.subtask_name}
                        </div>
                        <p className=" overflow-wrap break-words font-light">
                            {subtask_data.description}
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    )    
}