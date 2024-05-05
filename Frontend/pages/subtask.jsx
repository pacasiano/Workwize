import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';

// Subtask Components
import Label from '../components/subtask/subtaskLabel';
import Topbar from '../components/general/topbar'
import UserIcon from '../components/subtask/userIcon';
import Description from '../components/subtask/description';
import Date from '../components/subtask/date';
import Order from '../components/subtask/order';
import Actions from '../components/subtask/actions';

export default function Subtask() {

    const { subtask_id } = useParams();
    const [subtasks, setSubtasks] = useState({});
    

    useEffect(() => {

        fetch(`http://localhost:8000/api/subtasks/${subtask_id}/`)
        .then(res => res.json())
        .then(data => {setSubtasks(data)});

    }, [subtask_id]);

    return (
        <div className=" h-full">
            <Topbar setTitle={"Task"} search={false} />
            <div className="p-8 overflow-auto ">
                <div className='bg-[#fbf9f7] rounded-xl h-fit overflow-auto'>
                    <div className="p-10 flex flex-row justify-between">
                        <section className="flex flex-col justify-start gap-5 pr-20 w-full">
                            <div className="flex flex-col gap-3 w-full">
                                <div className='flex flex-row gap-4 w-full'>
                                    <div className=" whitespace-nowrap flex flex-row gap-2 justify-start items-center" >
                                    <FontAwesomeIcon icon={faBarsProgress} className='text-black' />
                                    <h1 className="text-2xl font-semibold">{subtasks.subtask_name}</h1>
                                    </div>
                                    
                                </div>
                                <div className="flex flex-col w-full gap-3 pl-6">
                                    <div className='flex flex-col gap-1'><div className='text-sm font-bold text-black/70'>Assigned Users</div>
                                        <UserIcon />
                                    </div>
                                    <div className='flex flex-col gap-0'><div className='text-sm font-bold text-black/70'>Labels</div>
                                    <Label />
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <Description />
                            </div>
                        </section>
                        <section className="flex flex-col p-5 w-[400px]">
                            <div className='flex flex-col gap-6'>
                                <Date />
                                <Order />
                                <Actions />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}