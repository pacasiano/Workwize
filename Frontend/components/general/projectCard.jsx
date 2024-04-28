
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export default function ProjectCard({data}) {

    ProjectCard.propTypes = {
        data: PropTypes.object.isRequired,
    };

    return (
        <Link to={`${data.project_id}`} className="">
            <div className="p-5 bg-white hover:drop-shadow-xl drop-shadow-sm rounded-md w-56">
                <div className="flex flex-col gap-2">
                    <div  className="text-xl font-bold">
                        {data.project_name}
                    </div>
                    <div>
                        tae
                    </div>
                </div>
            </div>
        </Link>
    );
}