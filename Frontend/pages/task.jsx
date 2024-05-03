
import Label from '../components/task/newTaskLabel';
import Topbar from '../components/general/topbar'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

// Subtask Components
import UserIcon from '../components/subtask/userIcon';
import Description from '../components/subtask/description';
import Date from '../components/subtask/date';
import Order from '../components/subtask/order';
import Actions from '../components/subtask/actions';

export default function Task() {

    const { task_id, subtask_id } = useParams();
    const [subtasks, setSubtasks] = useState({});
    

    useEffect(() => {

        fetch(`http://localhost:8000/api/subtasks/${subtask_id}/`)
        .then(res => res.json())
        .then(data => {setSubtasks(data)});

    }, [subtask_id]);
    

    return (
        <div className="min-h-screen">
            <Topbar setTitle={subtasks.subtask_name||""} search={false} />
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

// {labels.map((tag, index) => (
//     <Label key={index} word={tag.label_name} color={tag.color} type={"2"} />
// ))}

// <div className="px-3 text-black bg-white/50 rounded-md flex flex-row justify-center items-center gap-2" >
// <form onSubmit={addTag}>
// <div className="px-2 text-sm h-full flex flex-row justify-center items-center gap-1">
//     <div className="text-black/80 font-light">
//         <input onChange={(e) => setTagName(e.target.value)} value={tagName} className="outline-none bg-inherit border-b-2 border-black/20 placeholder:font-normal placeholder:text-md placeholder:text-black/40 " placeholder="tag name..." />
//     </div>
//     <div className="bg-inherit font-normal pl-3 py-1">
//         <Compact
//         className="bg-inherit"
//         colors={colors}
//         color={hex}
//         onChange={(color) => {setHex(color.hex);}}
//         />
//     </div>
//     <button type="submit" className="bg-green-900/70 text-white px-2 h-8 w-20 rounded-md font-light text-nowrap">
//         Add Label
//     </button>
// </div>
// </form>
// </div>