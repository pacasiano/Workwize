
import { useParams } from "react-router-dom"

export default function Actions() {

    const { subtask_id } = useParams();

    return (
        <div className='flex flex-col gap-2'>
            <h1 className="text-lg font-semibold">Actions</h1>
            <div className="flex flex-col gap-2">
                <div className="relative flex flex-col gap-1 ">
                    <button className='w-full h-9 pl-2 rounded-sm bg-inherit outline-none border bg-neutral-200 hover:bg-neutral-300 border-black/30 px-1' >Move</button>
                    <button className='w-full h-9 pl-2 rounded-sm bg-inherit outline-none border bg-neutral-200 hover:bg-neutral-300 border-black/30 px-1' >Duplicate</button>
                    <button className='w-full h-9 pl-2 rounded-sm bg-inherit outline-none border bg-neutral-200 hover:bg-red-500 border-black/30 px-1' >Delete</button>
                </div>
            </div>
        </div>
    )
}