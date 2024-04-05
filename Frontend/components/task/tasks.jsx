import Topbar from "../general/topbar.jsx"
import ProjectCard from "./taskCard.jsx"
import PropTypes from 'prop-types';

export default function Tasks({data, setWindow, setChosenProj}) {

    Tasks.propTypes = {
        setWindow: PropTypes.func.isRequired,
        setChosenProj: PropTypes.func.isRequired,
        data: PropTypes.array.isRequired,
    };

    return (
        <div>
            <Topbar setTitle={"Task"} />
            <div className="w-full h-full p-10">
                <div className="flex flex-wrap gap-5 ">
                    {
                        data.map((project, index) => (
                            <ProjectCard key={index} data={project} setWindow={setWindow} setChosenProj={setChosenProj} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}