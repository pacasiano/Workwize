import Topbar from "../components/general/topbar"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ProjectName from "../components/settings/projectName"
import Background from "../components/settings/background";

import { toast } from 'react-toastify';

export default function Settings() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [deletable, setDeletable] = useState(false);
    const [project, setProject] = useState({});


    useEffect(() => {
        const fetchProject = async () => {
          try {
            const accessToken = sessionStorage.getItem('accessToken');
      
            //Redirect to login if there's no access token
            if (!accessToken) {
                window.location.href = "http://localhost:5173/login"
              return;
            }
      
            const response = await fetch(`http://localhost:8000/projects/${id}/`, {
                headers: {
                    'Authorization': `JWT ${accessToken}`, 
                },
            });
      
            if (!response.ok) {
              throw new Error(`Error fetching project with ID of ${id} inside try block: ${response.status}`);
            }
      
            const data = await response.json();
            setProject(data);
          } catch (error) {
            console.error(`Error fetching project with ID of ${id} in catch block: `, error);
          }
        };
      
        fetchProject();
      }, [id]);

    

    const onSubmit = () => {
        const accessToken = sessionStorage.getItem('accessToken');
      
        //Redirect to login if there's no access token
        if (!accessToken) {
            window.location.href = "http://localhost:5173/login"
            return;
        }

        fetch(`http://localhost:8000/projects/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `JWT ${accessToken}`,
                'Content-Type': 'application/json', 
            },
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            // Check if response body is empty
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                return {}; // Return empty object if response is not JSON
            }
            return res.json(); // Parse JSON response
        })
        .then(data => {
            toast.success(`${project.project_name} has been deleted successfully!`);
            navigate('/project');
            console.log(data);
        })
        .catch(error => {
            console.error('Error deleting project:', error);
            toast.error('Error deleting project');
            // Handle the error, e.g., show an error message to the user
        });
    }

    return (
        <div>
            <Topbar setTitle={"Settings"} />
            <section className="p-10">
                <main className='bg-[#fbf9f7] rounded-xl'>
                    <div className="p-10 flex flex-row gap-10 w-full">

                        <div className="flex flex-col gap-5 w-1/2">
                            <ProjectName />
                            {/* <Starred /> */}
                            <div className="flex flex-col gap-1">
                                <div className="text-lg font-semibold flex flex-row justify-start items-center gap-2">Danger Zone <input className="" onChange={(e)=> setDeletable(e.target.checked)} type="checkbox"/></div>
                                <p className="text-sm text-black/60">Once you delete a project, there is no going back. Please be certain.</p>
                                <button disabled={!deletable} className={`w-28 h-9 rounded-sm text-black/80 hover:text-black bg-red-500 hover:scale-105 cursor-pointer ${!deletable  && "cursor-not-allowed bg-slate-400 hover:scale-100"}`} onClick={onSubmit}>Delete</button>
                            </div>
                        </div>

                        <div className="w-1/2">
                            <Background />
                        </div>

                    </div>
                </main>
            </section>
        </div>
    )
}