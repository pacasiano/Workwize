
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Order() {

    const { task_id, subtask_id } = useParams();

    const [order, setOrder] = useState([]);
    const [currentOrder, setCurrentOrder] = useState('')
    const [edit, setEdit] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();


    useEffect(() => {
        const fetchSubtask = async () => {
          try {
            const accessToken = sessionStorage.getItem('accessToken');
      
            //Redirect to login if there's no access token
            if (!accessToken) {
                window.location.href = "http://localhost:5173/login"
              return;
            }
      
            const response = await fetch(`http://localhost:8000/subtasks/${subtask_id}/`, {
                headers: {
                    'Authorization': `JWT ${accessToken}`, 
                },
            });
            
            if (!response.ok) {
              throw new Error(`Error fetching subtask inside try block: ${response.status}`);
            }
      
            const data = await response.json();
            if (data.order_num === null) {
                setCurrentOrder(0);
                return;
            }
            setCurrentOrder(data.order_num);
          } catch (error) {
            console.error('Error fetching subtask in catch block: ', error);
          }
        };
        fetchSubtask();

        const fetchAllSubtasks = async () => {
            try {
              const accessToken = sessionStorage.getItem('accessToken');
        
              //Redirect to login if there's no access token
              if (!accessToken) {
                  window.location.href = "http://localhost:5173/login"
                return;
              }
        
              const response = await fetch(`http://localhost:8000/subtasks/`, {
                  headers: {
                      'Authorization': `JWT ${accessToken}`, 
                  },
              });
              
              if (!response.ok) {
                throw new Error(`Error fetching subtasks inside try block: ${response.status}`);
              }
        
              const data = await response.json();
              const filteredSubtasks = data.filter(subtask => subtask.task_id === parseInt(task_id));
              const order = filteredSubtasks.map(subtask => subtask.order_num);
              setOrder(order);
            } catch (error) {
              console.error('Error fetching subtasks in catch block: ', error);
            }
          };
          fetchAllSubtasks();
    }, [task_id, subtask_id]);

    const onSubmit = (data) => {

        if (data.order_num === undefined){
            toast.error('Please select an order');
            return;
        }
        if (data.order_num === currentOrder){
            toast.error('Order is the same');
            return;
        }

        const accessToken = sessionStorage.getItem('accessToken');
        //Redirect to login if there's no access token
        if (!accessToken) {
            window.location.href = "http://localhost:5173/login"
            return;
        }

        fetch(`http://localhost:8000/subtasks/${subtask_id}/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `JWT ${accessToken}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            toast.success('Order Updated');
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
                            <div className='absolute z-10 -top-3 left-3 translate-y-[11px] h-1'><div className='-translate-y-[9px] text-sm'>Order</div></div>
                            <input value={currentOrder} disabled className='w-full h-9 rounded-sm bg-inherit outline-none border bg-neutral-200 px-3' />
                        </div>
                    ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative flex flex-col gap-2">
                            <div className='absolute z-10 -top-3 left-3 bg-[#fbf9f7] translate-y-[9px] h-1'><div className='-translate-y-[7px] text-sm'>Order</div></div>
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
                            <input type='submit' className='w-28 h-9 rounded-sm text-black/50 hover:text-black bg-green-500 hover:bg-green-300 cursor-pointer' />
                        </div>
                    </form>
                    )}
            </div>
        </div>
    )
}