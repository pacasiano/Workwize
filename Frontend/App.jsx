
import { useState } from "react"
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Sidebar from "./components/general/sidebar"
import Tasks from "./components/task/tasks"
import Settings from "./components/functionalities/settings"
import Dashboard from "./components/dashboard/dashboard"
import NewTask from "./components/task/newTask"
import Calendar from "./components/calendar/calendar"
import Task from "./components/task/task"
import Project from "./data/Project"
import Landing from './components/general/landing.jsx'
import Home from './components/general/home.jsx'
import SpinnerOfDoom from "./components/general/spinnerOfDoom"
import Error404 from "./components/general/error404.jsx";


function App() {

  const [Wide, setWide] = useState(true)
  const [showAddProj, setAddProj] = useState({ show: false, data: {} })
  const [chosenProj, setChosenProj] = useState("")

  // get the project where href is /projectID
  const [projectInfo, setProjectInfo] = useState(Project[0])

  const router = createBrowserRouter([
    {
      // for testing purposes
      path : "/test",
      element: <SpinnerOfDoom />,
    },
    {
      path: "*",
      element: <Error404 />,
    },
    {
      index: true,
      element: <Landing />,
    },
    {
      path: "/project",
      element: <Home data={Project} />,
    },
    {
      // this should be changed to /project/:id or just /:id
      path: "/project/:id",
      element:(
        <div className={`h-screen flex flex-row transition-all will-change-scroll`}>
          <Sidebar data={projectInfo} Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
          <div className="w-full max-h-screen overflow-clip bg-orange-50 scroll-smooth">
          <Tasks  setChosenProj={setChosenProj} setAddProj={setAddProj} projectInfo={projectInfo}  />
          </div>
          {showAddProj.show ? <NewTask projectInfo={projectInfo} showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
    {
      // this should be changed to /project/:id/:task_id or just /:id/:task_id
      path: "/project/:id/tasks",
      element:(
        <div className={`h-screen flex flex-row transition-all will-change-scroll`}>
          <Sidebar data={projectInfo} Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
          <div className="w-full max-h-screen overflow-clip bg-orange-50 scroll-smooth">
          <Tasks  setChosenProj={setChosenProj} setAddProj={setAddProj} projectInfo={projectInfo}  />
          </div>
          {showAddProj.show ? <NewTask projectInfo={projectInfo} showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/settings",
      element:(
        <div className={`h-screen flex flex-row transition-all will-change-scroll`}>
          <Sidebar data={projectInfo} Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
          <div className="w-full max-h-screen overflow-clip bg-orange-50 scroll-smooth">
          <Settings />
          </div>
          {showAddProj.show ? <NewTask projectInfo={projectInfo} showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      ),
      errorElement: <div>404</div>,
    },
    {
      path: "/project/:id/tasks/:task_id",
      element:(
        <div className={`h-screen flex flex-row transition-all will-change-scroll`}>
          <Sidebar data={projectInfo} Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
          <div className="w-full max-h-screen overflow-clip bg-orange-50 scroll-smooth">
          <Task data={chosenProj} />
          </div>
          {showAddProj.show ? <NewTask projectInfo={projectInfo} showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/dashboard",
      element:(
        <div className={`h-screen flex flex-row transition-all will-change-scroll`}>
          <Sidebar data={projectInfo} Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
          <div className="w-full max-h-screen overflow-clip bg-orange-50 scroll-smooth">
          <Dashboard />
          </div>
          {showAddProj.show ? <NewTask projectInfo={projectInfo} showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/calendar",
      element:(
        <div className={`h-screen flex flex-row transition-all will-change-scroll`}>
          <Sidebar data={projectInfo} Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
          <div className="w-full max-h-screen overflow-clip bg-orange-50 scroll-smooth">
          <Calendar  setChosenProj={setChosenProj} setAddProj={setAddProj} projectInfo={projectInfo} />;
          </div>
          {showAddProj.show ? <NewTask projectInfo={projectInfo} showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
  ]);
  

  return (
    <>
    <RouterProvider router={router} fallbackElement={<SpinnerOfDoom />}/>
    </>
  )
}

export default App
