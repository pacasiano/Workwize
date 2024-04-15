import { useState } from "react";
import PropTypes from 'prop-types';
import Compact from '@uiw/react-color-compact';
import Tag from '../general/tag';

export default function Tags ({chosenTags, setChosenTags}) {

    Tags.propTypes = {
        chosenTags: PropTypes.array.isRequired,
        setChosenTags: PropTypes.func.isRequired,
    };

    const colors = [
        '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#1A73E8', '#FF6F00', '#4CAF50', '#9C27B0'
    ]

    const [tagName, setTagName] = useState('');
    const [hex, setHex] = useState('#F44E3B');

    const addTag = () => {
        //instaed of setStates, update the database of the changes to the users states
        setChosenTags([...chosenTags, { word: tagName, color: hex}]);
        setTagName("")
        setHex("#FFFFFF")
    }


    return (
        <div>
            <label>Tags</label>
            <div className="flex flex-wrap gap-1 py-1 w-60">
                {chosenTags.map((tag, index) => (
                    <div key={index} onClick={()=> setChosenTags(chosenTags.filter(n => n.word !== tag.word))}>
                    <Tag  word={tag.word} color={tag.color} />
                    </div>
                ))}
            </div>
            <div className="flex flex-col outline focus-within:outline-1 outline-0 group rounded-md">
                <div className="">
                    <input onChange={(e)=> setTagName(e.target.value)} value={tagName} className="bg-neutral-100 outline-none rounded-t-md w-60 h-10 pl-2" placeholder="Tag Name" />
                </div>
                <Compact
                className="bg-neutral-100"
                colors={colors}
                color={hex}
                onChange={(color) => {setHex(color.hex);}}
                />
                <button onClick={addTag} className="bg-blue-900/80 rounded-b-[4px] text-white w-full hover:bg-blue-900/90 text-sm">Add</button>
            </div>
        </div>
    )
}