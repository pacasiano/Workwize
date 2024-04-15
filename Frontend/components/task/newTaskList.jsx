import { useState } from 'react';
import PropTypes from 'prop-types';
import Compact from '@uiw/react-color-compact';
import Tag from '../general/tag';

export default function List ({chosenList, setChosenList}) {

    List.propTypes = {
        chosenList: PropTypes.object.isRequired,
        setChosenList: PropTypes.func.isRequired,
    };

    const colors = [
        '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#1A73E8', '#FF6F00', '#4CAF50', '#9C27B0'
    ]

    const [hex2, setHex2] = useState('#F44E3B');

    const AddList = (e) => {
        e.preventDefault();
        //instaed of setStates, update the database of the changes to the users states
        setChosenList({name: e.target.name.value, color: hex2})
    }

    return (
        <div>
            <label>List</label>
            <form onSubmit={(e) => AddList(e)}>
            <div className="flex flex-wrap gap-1 py-1 w-60">
                <div className="hover:cursor-pointer" >
                    <Tag word={chosenList.name} color={chosenList.color} type={"3"} />
                </div>
            </div>
            <div className="flex flex-col outline focus-within:outline-1 outline-0 group rounded-md">
                <div className="">
                    <input name="name" className="bg-neutral-100 outline-none rounded-t-md w-60 h-10 pl-2" placeholder="List Name" />
                </div>
                <Compact
                className="bg-neutral-100"
                colors={colors}
                color={hex2}
                onChange={(color) => {setHex2(color.hex);}}
                />
                <button type='submit' className="bg-blue-900/80 rounded-b-[4px] text-white w-full hover:bg-blue-900/90 text-sm">Change</button>
            </div>
            </form>
        </div>
    )
}