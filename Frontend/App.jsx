
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


import Landing from './components/general/landing.jsx'
import Home from './components/general/home.jsx'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {

  const [Wide, setWide] = useState(true)
  const [showAddProj, setAddProj] = useState({ show: false, data: {} })
  const [chosenProj, setChosenProj] = useState("")

  // get the project where href is /projectID
  const [projectInfo, setProjectInfo] = useState(Project[0])

  const router = createBrowserRouter([
    {
<<<<<<< HEAD
      path: "/",
      element: <Landing />,
      errorElement: <div>404</div>,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/project",
=======
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
>>>>>>> 03973fef34d53334d823a6002d259564b837e320
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
<<<<<<< HEAD
      path: "/project/tasks",
=======
      // this should be changed to /project/:id/:task_id or just /:id/:task_id
      path: "/project/:id/tasks",
>>>>>>> 03973fef34d53334d823a6002d259564b837e320
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
<<<<<<< HEAD
      path: "/project/settings",
=======
      path: "/project/:id/settings",
>>>>>>> 03973fef34d53334d823a6002d259564b837e320
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
<<<<<<< HEAD
      path: "/project/tasks/task",
=======
      path: "/project/:id/tasks/:task_id",
>>>>>>> 03973fef34d53334d823a6002d259564b837e320
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
<<<<<<< HEAD
      path: "/project/dashboard",
=======
      path: "/project/:id/dashboard",
>>>>>>> 03973fef34d53334d823a6002d259564b837e320
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
<<<<<<< HEAD
      path: "/project/calendar",
=======
      path: "/project/:id/calendar",
>>>>>>> 03973fef34d53334d823a6002d259564b837e320
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
<<<<<<< HEAD
    <RouterProvider router={router} />
=======
    <RouterProvider router={router} fallbackElement={<SpinnerOfDoom />}/>
>>>>>>> 03973fef34d53334d823a6002d259564b837e320
    </>
  )
}

export default App
