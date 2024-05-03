
import { useEffect, useState } from 'react';
import { useForm  } from 'react-hook-form';

// use "https://react-hook-form.com/form-builder"

export default function TaskSet() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(errors);
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/tasks/`)
        .then(res => res.json())
        .then(data => {
            setData(data)
        });
    }, [])

    const onSubmit = (data) => {
        //dapat ma set sa database na false
        fetch(`http://localhost:8000/tasks/${data.task_id}/`,{
            method: 'PATCH',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({order_num: data.order_num})
        })
        .then(res => {res.json()})
        .catch(error => {console.error(error)})
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
        </div>
    )
}