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
        const fetchLabels = async () => {
          try {
            const accessToken = sessionStorage.getItem('accessToken');
      
            //Redirect to login if there's no access token
            if (!accessToken) {
                window.location.href = "http://localhost:5173/login"
              return;
            }
      
            const response = await fetch(`http://localhost:8000/labels/`, {
                headers: {
                    'Authorization': `JWT ${accessToken}`, 
                },
            });
      
            if (!response.ok) {
              throw new Error(`Error fetching labels inside try block: ${response.status}`);
            }
      
            const data = await response.json();
            const filteredLabels = data.filter(label => label.subtask_id === subtask_data.subtask_id);
            setLabels(filteredLabels);
          } catch (error) {
            console.error('Error fetching labels in catch block: ', error);
          }
        };
      
        fetchLabels();
      }, [subtask_data]);

    return (
        <div className="flex flex-row gap-0 ">
            <Link to={`/project/${id}/tasks/${task_id}/subtask/${subtask_data.subtask_id}`} relative='path' className="hover:cursor-pointer">
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
                <div className="pb-5 px-5 flex flex-col gap-2">
                    <div  className="text-xl font-bold">
                        {subtask_data.subtask_name}
                    </div>
                    <p className="overflow-auto max-h-20 break-words font-light">
                        {subtask_data.description}
                    </p>
                </div>
            </div>
            </Link>
        </div>
    )    
}