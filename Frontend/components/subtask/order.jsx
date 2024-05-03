
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Order() {

    const { task_id, subtask_id } = useParams();

    const [order, setOrder] = useState([]);
    const [currentOrder, setCurrentOrder] = useState('')
    const [edit, setEdit] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {

        fetch(`http://localhost:8000/api/subtasks/${subtask_id}/`)
        .then(res => res.json())
        .then(data => {
            if (data.order_num === null) {
                setCurrentOrder(0);
                return;
            }
            setCurrentOrder(data.order_num);
        });

        fetch(`http://localhost:8000/api/subtasks/`)
        .then(res => res.json())
        .then(data => {
            const filteredSubtasks = data.filter(subtask => subtask.task_id === parseInt(task_id));
            const order = filteredSubtasks.map(subtask => subtask.order_num);
            setOrder(order);
        });

    }, [task_id, subtask_id]);

    const onSubmit = (data) => {

        if (data.order_num === undefined) return;
        console.log(errors)

        if (data.order_num === currentOrder) return;
        fetch(`http://localhost:8000/api/subtasks/${subtask_id}/`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            setCurrentOrder(data.order_num);
            setEdit(false);
        });

    }

    return (
        <div className='flex flex-col gap-2'>
            <div className="flex flex-row justify-between gap-2">
                <h1 className="text-lg font-semibold">Order in List</h1>
                <section onClick={()=> setEdit(!edit)} className="flex items-center select-none justify-center text-center rounded-md bg-neutral-200 h-7 px-2 cursor-pointer hover:bg-neutral-400 group">
                    <div className='group-hover:text-white text-black/50 font-light text-sm'>{!edit ? "Edit" : "Cancel"}</div>
                </section>
            </div>
            <div className="flex flex-col gap-2">
                
                    {!edit ? (
                        <div className="relative ">
                            <div className='absolute z-10 -top-3 left-3 bg-[#fbf9f7] translate-y-[11px] h-1'><div className='-translate-y-[9px] text-sm'>Order</div></div>
                            <input value={currentOrder} disabled className='w-full h-9 rounded-sm bg-inherit outline-none border border-black/30 px-3' />
                        </div>
                    ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative flex flex-col gap-2">
                            <div className='absolute z-10 -top-3 left-3 bg-[#fbf9f7] translate-y-[11px] h-1'><div className='-translate-y-[9px] text-sm'>Order</div></div>
                            <div className=' bg-neutral-200 outline-none border border-black w-full px-2'>
                                
                                <select {...register("order_num")} className='w-full h-9 rounded-sm bg-inherit outline-none' >

                                    {/* Mapping over the order array */}
                                    {order.map((num, index) => (
                                        <option key={index} value={index}>{index}</option>
                                    ))}

                                    {/* Additional option */}
                                    <option value={order.length}>{order.length}</option>

                                </select>

                            </div>
                            <input type='submit' className='w-full h-9 rounded-sm text-black/50 hover:text-black bg-green-500 hover:bg-green-300 cursor-pointer' />
                        </div>
                    </form>
                    )}
            </div>
        </div>
    )
}