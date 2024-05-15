
import { useEffect, useState } from 'react';
import { useForm  } from 'react-hook-form';

// use "https://react-hook-form.com/form-builder"

import { toast } from 'react-toastify';

export default function TaskSet() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(errors);
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const accessToken = sessionStorage.getItem('accessToken');
            console.log(accessToken)
      
            //Redirect to login if there's no access token
            if (!accessToken) {
                window.location.href = "http://localhost:5173/login"
              return;
            }
      
            const response = await fetch(`http://localhost:8000/tasks/`, {
                headers: {
                    'Authorization': `JWT ${accessToken}`, 
                },
            });
      
            if (!response.ok) {
              throw new Error(`Error fetching tasks inside try block: ${response.status}`);
            }
      
            const data = await response.json();
            setData(data)
          } catch (error) {
            console.error('Error fetching tasks in catch block: ', error);
          }
        };
      
        fetchTasks();
      }, []);

    const onSubmit = (data) => {
        //dapat ma set sa database na false
        // fetch(`http://localhost:8000/tasks/${data.task_id}/`,{
        //     method: 'PATCH',
        //     headers: { 'content-Type': 'application/json' },
        //     body: JSON.stringify({order_num: data.order_num})
        // })
        // .then(res => {res.json()})
        // .catch(error => {console.error(error)})

        toast.success("This is a toast notification !")
        
    }

    const submit2 = (e) =>{
        e.preventDefault();
        toast.error("This is a toast notification !")
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("task_id")}>
            {data.map((item, index) => (
            <option key={index} value={item.task_id}>{item.task_id}</option>
            ))}
            </select>
            <input type="number" placeholder="order_num" {...register("order_num", {})} />
            <input type="submit" />
            </form>
            <form onClick={submit2}>
                <button>Submit</button>
            </form>
        </div>
    )
}