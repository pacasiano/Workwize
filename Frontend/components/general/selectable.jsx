
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
        text-black select-none drop-shadow-xl shadow-white text-center h-full w-full
        text-md font-bold transition-all ease-in-out hover:bg-black/70 hover:text-white/90
        ${ (selected===input) &&"bg-black/10 shadow-md shadow-black/10"} active:bg-black/60
        rounded-md py-2 px-3 hover:cursor-pointer
        `}>
        {child}</div>
        </>
    )
}