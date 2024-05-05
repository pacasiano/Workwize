
import { useState } from "react"
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Sidebar from "./components/general/sidebar"
import Tasks from "./pages/tasks.jsx"
import Settings from "./pages/settings.jsx"
import Dashboard from "./pages/dashboard.jsx"
import NewTask from "./components/task/newTask"
import Calendar from "./pages/calendar.jsx"
import Task from "./pages/task.jsx"
import Landing from './pages/landing.jsx'
import Home from './pages/home.jsx'
import SpinnerOfDoom from "./components/general/spinnerOfDoom"
import Error404 from "./components/general/error404.jsx";
import Header from "./components/general/header.jsx";
import Users from "./pages/users.jsx"


// ito lang galawin mo remz
import LoginPage from "./components/loginsignup/LoginPage.jsx";
import SignUpPage from "./components/loginsignup/SignUpPage.jsx";
import ForgotPasswordPage from "./components/loginsignup/ForgotPasswordPage.jsx"
// hangang dito lang

function App() {

  const [Wide, setWide] = useState(false)
  const [showAddProj, setAddProj] = useState({ show: false, data: {} })
  const [chosenProj, setChosenProj] = useState("")


  const router = createBrowserRouter([
    {
      // for testing purposes (dito mo ilagay ang link remz, change mo lang yung element)
      path : "/test",
      element: <ForgotPasswordPage />
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
      element: <Home />,
    },
    {
      path: "/project/:id",
      element:(
        <div className={`h-screen w-full`}>
          <Header />
          <div className="pt-[60px] h-full w-full flex flex-row transition-all will-change-scroll">
            <Sidebar Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
            <div className="w-full max-h-screen overflow-clip bg-[#EBDFD7] scroll-smooth">
            <Tasks  setChosenProj={setChosenProj} setAddProj={setAddProj} />
            </div>
          </div>
          {showAddProj.show ? <NewTask showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/tasks",
      element:(
        <div className={`h-screen w-full`}>
          <Header />
          <div className="pt-[60px] h-full w-full flex flex-row transition-all will-change-scroll">
            <Sidebar Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
            <div className="w-full max-h-screen overflow-clip bg-[#EBDFD7] scroll-smooth">
            <Tasks  setChosenProj={setChosenProj} setAddProj={setAddProj} />
            </div>
          </div>
          {showAddProj.show ? <NewTask  showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/users",
      element:(
        <div className={`h-screen w-full`}>
          <Header />
          <div className="pt-[60px] h-full w-full flex flex-row transition-all will-change-scroll">
            <Sidebar Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
            <div className="w-full max-h-screen overflow-clip bg-[#EBDFD7] scroll-smooth">
            <Users />
            </div>
          </div>
          {showAddProj.show ? <NewTask showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/settings",
      element:(
        <div className={`h-screen w-full`}>
          <Header />
          <div className="pt-[60px] h-full w-full flex flex-row transition-all will-change-scroll">
            <Sidebar Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
            <div className="w-full max-h-screen overflow-clip bg-[#EBDFD7] scroll-smooth">
            <Settings />
            </div>
          </div>
          {showAddProj.show ? <NewTask showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/tasks/:task_id",
      element:(
        <div className={`h-screen w-full`}>
          <Header />
          <div className="pt-[60px] h-full w-full flex flex-row transition-all will-change-scroll">
            <Sidebar Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
            <div className="w-full max-h-screen overflow-clip bg-[#EBDFD7] scroll-smooth">
            <Task data={chosenProj} />
            </div>
          </div>
          {showAddProj.show ? <NewTask  showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/dashboard",
      element:(
        <div className={`h-screen w-full`}>
          <Header />
          <div className="pt-[60px] h-full w-full flex flex-row transition-all will-change-scroll">
            <Sidebar Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
            <div className="w-full max-h-screen overflow-clip bg-[#EBDFD7] scroll-smooth">
            <Dashboard />
            </div>
          </div>
          {showAddProj.show ? <NewTask  showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/calendar",
      element:(
        <div className={`h-screen w-full`}>
          <Header />
          <div className="pt-[60px] h-full w-full flex flex-row transition-all will-change-scroll">
            <Sidebar Wide={Wide} setWide={setWide}  setAddProj={setAddProj} />
            <div className="w-full max-h-screen overflow-clip bg-[#EBDFD7] scroll-smooth">
            <Calendar setAddProj={setAddProj} />
            </div>
          </div>
          {showAddProj.show ? <NewTask  showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
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
