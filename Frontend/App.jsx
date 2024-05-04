
import { useState } from "react"
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components & Pages
import Sidebar from "./components/general/sidebar"
import Tasks from "./pages/tasks.jsx"
import Settings from "./pages/settings.jsx"
import Dashboard from "./pages/dashboard.jsx"
import NewSubtask from "./components/subtask/newSubtask.jsx"
import NewTask from "./components/task/newTask.jsx";
import Calendar from "./pages/calendar.jsx"
import Subtask from "./pages/subtask.jsx"
import Landing from './pages/landing.jsx'
import Home from './pages/home.jsx'
import SpinnerOfDoom from "./components/general/spinnerOfDoom"
import Error404 from "./components/general/error404.jsx"
import Header from "./components/general/header.jsx"
import Footer from "./components/general/footer.jsx"
import Users from "./pages/users.jsx"
import Faq from "./pages/faq.jsx"
import Contact from "./pages/contact.jsx"
import About from "./pages/about.jsx"
import FormSample from "./pages/formSample.jsx"
import NewProject from "./components/project/newProject";

// Context
import { ReloadContext } from "./context/contexts.jsx";

function App() {

  const [Wide, setWide] = useState(false)
  const [showAddProj, setAddProj] = useState({ show: false, data: {} })
  const [showAddTask, setAddTask] = useState({ show: false, data: {} })
  const [showAddSubtask, setAddSubtask] = useState({ show: false, data: {} })
  const [loggedIn, setLoggedIn] = useState(true)

  // context
  const [reload, setReload] = useState(false);

  const router = createBrowserRouter([
    {
      // for testing purposes
      path : "/test",
      element: <FormSample />,
    },
    {
      path: "*",
      element: <Error404 />,
    },
    {
      index: true,
      element: (
        <div className={`h-screen w-full bg-[#EBDFD7]`}>
          <Header loggedIn={loggedIn} />
          <Landing />
          <Footer />
        </div>
      ),
    },
    {
      path: "/project",
      element: (
      <div className={`min-h-screen w-full bg-[#EBDFD7]`}>
        <Header loggedIn={loggedIn} />
        <Home showAddProj={showAddProj} setAddProj={setAddProj} />
        <Footer />
        {showAddProj.show ? <NewProject showAddProj={showAddProj} setAddProj={setAddProj} /> : null}
      </div>
      ),
    },
    {
      path: "/project/:id",
      element:(
        <div className={`h-screen w-full`}>
          <Header loggedIn={loggedIn} />
          <div className="pt-[60px] h-full w-full flex flex-row transition-all will-change-scroll">
            <Sidebar Wide={Wide} setWide={setWide}  setAddTask={setAddTask} />
            <div className="w-full max-h-screen overflow-auto bg-[#EBDFD7] scroll-smooth">
            <Tasks setAddSubtask={setAddSubtask} />
            </div>
          </div>
          {showAddTask.show ? <NewTask setAddTask={setAddTask} /> : null}
          {showAddSubtask.show ? <NewSubtask showAddSubtask={showAddSubtask} setAddSubtask={setAddSubtask} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/tasks",
      element:(
        <div className={`h-screen w-full`}>
          <Header loggedIn={loggedIn} />
          <div className="pt-[60px] h-full w-full flex flex-row transition-all will-change-scroll">
            <Sidebar Wide={Wide} setWide={setWide}  setAddTask={setAddTask} />
            <div className="w-full max-h-screen overflow-auto bg-[#EBDFD7] scroll-smooth">
            <Tasks setAddSubtask={setAddSubtask} />
            </div>
          </div>
          {showAddTask.show ? <NewTask setAddTask={setAddTask} /> : null}
          {showAddSubtask.show ? <NewSubtask showAddSubtask={showAddSubtask} setAddSubtask={setAddSubtask} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/users",
      element:(
        <div className={`h-screen w-full`}>
          <Header loggedIn={loggedIn} />
          <div className="pt-[60px] h-full w-full flex flex-row transition-all will-change-scroll">
            <Sidebar Wide={Wide} setWide={setWide}  setAddTask={setAddTask} />
            <div className="w-full max-h-screen overflow-auto bg-[#EBDFD7] scroll-smooth">
            <Users />
            </div>
          </div>
          {showAddSubtask.show ? <NewSubtask showAddSubtask={showAddSubtask} setAddSubtask={setAddSubtask} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/settings",
      element:(
        <div className={`h-screen w-full`}>
          <Header loggedIn={loggedIn} />
          <div className="pt-[60px] h-full w-full flex flex-row transition-all will-change-scroll">
            <Sidebar Wide={Wide} setWide={setWide}  setAddTask={setAddTask} />
            <div className="w-full max-h-screen overflow-auto bg-[#EBDFD7] scroll-smooth">
            <Settings />
            </div>
          </div>
          {showAddSubtask.show ? <NewSubtask showAddSubtask={showAddSubtask} setAddSubtask={setAddSubtask} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/tasks/:task_id/subtask/:subtask_id",
      element:(
        <div className={`h-screen w-full`}>
          <Header loggedIn={loggedIn} />
          <div className="pt-[60px] h-full w-full flex flex-row transition-all will-change-scroll">
            <Sidebar Wide={Wide} setWide={setWide}  setAddTask={setAddTask} />
            <div className="w-full max-h-screen overflow-auto bg-[#EBDFD7] scroll-smooth">
            <Subtask />
            </div>
          </div>
          {showAddSubtask.show ? <NewSubtask showAddSubtask={showAddSubtask} setAddSubtask={setAddSubtask} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/dashboard",
      element:(
        <div className={`h-screen w-full`}>
          <Header loggedIn={loggedIn} />
          <div className="pt-[60px] h-full w-full flex flex-row transition-all will-change-scroll">
            <Sidebar Wide={Wide} setWide={setWide}  setAddTask={setAddTask} />
            <div className="w-full max-h-screen overflow-auto bg-[#EBDFD7] scroll-smooth">
            <Dashboard />
            </div>
          </div>
          {showAddSubtask.show ? <NewSubtask showAddSubtask={showAddSubtask} setAddSubtask={setAddSubtask} /> : null}
        </div>
      )
    },
    {
      path: "/project/:id/calendar",
      element:(
        <div className={`h-screen w-full`}>
          <Header loggedIn={loggedIn} />
          <div className="pt-[60px] h-full w-full flex flex-row transition-all will-change-scroll">
            <Sidebar Wide={Wide} setWide={setWide}  setAddTask={setAddTask} />
            <div className="w-full max-h-screen overflow-auto bg-[#EBDFD7] scroll-smooth">
            <Calendar setAddSubtask={setAddSubtask} />
            </div>
          </div>
          {showAddTask.show ? <NewTask setAddTask={setAddTask} /> : null}
          {showAddSubtask.show ? <NewSubtask showAddSubtask={showAddSubtask} setAddSubtask={setAddSubtask} /> : null}
        </div>
      )
    },
    {
      path: "/about",
      element: (
      <div className={`h-screen w-full`}>
        <Header loggedIn={loggedIn} />
        <div className="flex flex-col pt-[60px] h-screen">
          <About />
        </div>
        <Footer />
      </div>
      ),
    },
    {
      path: "/contact",
      element: (
      <div className={`h-screen w-full`}>
        <Header loggedIn={loggedIn} />
        <div className="flex flex-col pt-[60px] h-screen">
          <Contact />
        </div>
        <Footer />
      </div>
      ),
    },
    {
      path: "/faq",
      element: (
      <div className={`h-screen w-full`}>
        <Header loggedIn={loggedIn} />
        <div className="flex flex-col pt-[60px] h-screen">
          <Faq />
        </div>
        <Footer />
      </div>
      ),
    },
  ]);
  

  return (
    <div className="bg-[#EBDFD7]">
    <ReloadContext.Provider value={{reload, setReload}}>
    <RouterProvider router={router} fallbackElement={<SpinnerOfDoom />}/>
    </ReloadContext.Provider>
    </div>
  )
}

export default App
