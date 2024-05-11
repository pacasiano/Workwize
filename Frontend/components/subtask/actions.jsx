
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Actions() {

    const { subtask_id } = useParams();
    const navigate = useNavigate();

    const deleteSubtask = () => {

        fetch(`http://localhost:8000/api/subtasks/${subtask_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            if (res.ok) {
                console.log("Task deleted successfully");
                toast.success('Task deleted successfully');
            } else {
                throw new Error('Failed to delete task');
            }
        })
        .catch(err => console.error(err));

        navigate("../../../..", { relative: "path"})

    }

    return (
        <div className='flex flex-col gap-2'>
            <h1 className="text-lg font-semibold">Actions</h1>
            <div className="flex flex-col gap-2">
                <div className="relative flex flex-col gap-1 ">
                    <button className='w-full h-9 pl-2 rounded-sm bg-inherit outline-none border bg-neutral-200 hover:bg-neutral-300 border-black/30 px-1' >Move</button>
                    <button className='w-full h-9 pl-2 rounded-sm bg-inherit outline-none border bg-neutral-200 hover:bg-neutral-300 border-black/30 px-1' >Duplicate</button>
                    <button onClick={deleteSubtask} className='w-full h-9 pl-2 rounded-sm bg-inherit outline-none border bg-neutral-200 hover:bg-red-500 border-black/30 px-1' >Delete</button>
                </div>
            </div>
        </div>
    )
}