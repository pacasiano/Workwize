import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

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
        <div className="min-h-screen">
            <Topbar setTitle={"Task"} search={false} />
            <div className="p-8 ">
                <div className='bg-[#fbf9f7] rounded-xl'>
                    <div className="p-10 flex flex-row justify-between">
                        <section className="flex flex-col justify-start gap-10 pr-20 w-full">
                            <div className="flex flex-col gap-4 w-full">
                                <div className='flex flex-row gap-4 w-full'>
                                    <div className=" whitespace-nowrap">
                                    <h1 className="text-2xl font-semibold">{subtasks.subtask_name}</h1>
                                    </div>
                                    <UserIcon />
                                </div>
                                <div className="flex flex-row w-full">
                                    <Label />
                                </div>
                            </div>
                            <Description />
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