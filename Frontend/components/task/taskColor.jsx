
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import propTypes from 'prop-types';
import Compact from '@uiw/react-color-compact';

// Context Imports
import { ReloadContext } from "../../context/contexts"
import { useContext } from 'react';

const TaskColor = ({task}) => {

    TaskColor.propTypes = {
        task: propTypes.object,
    };

    

    // context
    const { reload, setReload } = useContext(ReloadContext);

    const [changeColor, setChangeColor] = useState(false)
    const colors = ['#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#1A73E8', '#FF6F00', '#4CAF50', '#9C27B0']
    const [hex, setHex] = useState('#F44E3B');

    const { handleSubmit } = useForm();

    const onSubmit = () => {
        // console.log(hex)

        if(hex === '') {
            return
        }
        if(hex === task.color) {
            return
        }

        fetch(`http://localhost:8000/api/tasks/${task.task_id}/`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                color: hex,
            })
        })
        .then(res => res.json())
        .then(() => {
            setChangeColor(false)
            setReload(!reload)
        })
        

    }

    return (
        <>
        {!changeColor ?
        <div onClick={() => setChangeColor(true)} className='font-medium text-sm px-2 rounded-md hover:font-semibold cursor-pointer hover:bg-neutral-200 p-1'>Change Name</div>
        :
        (
        <div className='relative flex flex-col bg-neutral-200 rounded-md'>
            <div className='font-medium text-sm px-2    p-1'>Change Color</div>
            <div onClick={() => setChangeColor(false)} className='absolute right-3 font-medium hover:font-bold cursor-pointer '>x</div>
            <div className='px-2 pb-2 w-full'>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Compact
                colors={colors}
                color={hex}
                onChange={(color) => {setHex(color.hex);}}
                style={{backgroundColor: "inherit", width: "100%"}}
                />
                <button type='submit' className=' w-full bg-blue-400 rounded-md font-medium text-sm' >Change</button>
                </form>
            </div>
        </div>
        )
        }
        </>
    )
}

export default TaskColor;