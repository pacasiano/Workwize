
import PropTypes from 'prop-types';

export default function Selectable({input ,child, selected, setSelected}) {

    Selectable.propTypes = {
        input: PropTypes.string,
        child: PropTypes.string,
        selected: PropTypes.string,
        setSelected: PropTypes.func,
    };

    return (
        <>
        <div onClick={()=> setSelected(input)}
        className={`
        text-black select-none text-center h-full w-full
        text-md font-bold transition-all ease-in-out hover:bg-neutral-800/20 
        ${ (selected===input) &&"bg-neutral-700/10"} active:bg-black/20
        rounded-md py-2 px-3 hover:cursor-pointer
        `}>
        {child}</div>
        </>
    )
}