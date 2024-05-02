
import { useState } from "react"
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components & Pages
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
import Error404 from "./components/general/error404.jsx"
import Header from "./components/general/header.jsx"
import Footer from "./components/general/footer.jsx"
import Users from "./pages/users.jsx"
import Faq from "./pages/faq.jsx"
import Contact from "./pages/contact.jsx"
import About from "./pages/about.jsx"
import AddProject from "./pages/project.jsx"

function App() {

  const [Wide, setWide] = useState(false)
  const [showAddProj, setAddProj] = useState({ show: false, data: {} })
  const [chosenProj, setChosenProj] = useState("")
  const [loggedIn, setLoggedIn] = useState(true)

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
      <div className={`h-screen w-full`}>
        <Header loggedIn={loggedIn} />
        <Home />
        <Footer />
      </div>
      ),
    },
    {
      path: "/project/:id",
      element:(
        <div className={`h-screen w-full`}>
          <Header loggedIn={loggedIn} />
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
          <Header loggedIn={loggedIn} />
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
          <Header loggedIn={loggedIn} />
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
          <Header loggedIn={loggedIn} />
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
          <Header loggedIn={loggedIn} />
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
          <Header loggedIn={loggedIn} />
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
          <Header loggedIn={loggedIn} />
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
    <RouterProvider router={router} fallbackElement={<SpinnerOfDoom />}/>
    </div>
  )
}

export default App
