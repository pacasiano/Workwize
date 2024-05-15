
import { useState } from "react"
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components & Pages
import Sidebar from "./components/general/sidebar"
import Tasks from "./pages/tasks.jsx"
import Settings from "./pages/settings.jsx"
import Dashboard from "./pages/dashboard.jsx"
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
import FormSample from "./pages/formSample.jsx"
import NewUser from "./components/users/addUser.jsx";
import UserSettings from "./pages/userSettings.jsx"

// ito lang galawin mo remz
import LoginSignin from "./pages/UserLoginSignin.jsx";
// hangang dito lang

import NewProject from "./components/project/newProject";

// Context
import { ReloadContext } from "./context/contexts.jsx";
import { AddUser } from "./context/addUser.jsx";
import { UserContext } from "./context/userContext.jsx";
import { useContext } from "react";

function App() {

  // user information
  const { user, setUser } = useContext(UserContext);

  // lagay ka dito ng checker ng session storage if may auth key?
  // basta if meron kay meaning naka login yung user, idk pano siya tbh
  // pero naga base rn if naka login yung user sa user context, PERO
  // mawala yung user context pag nag refresh, so dapat kunin sa session storage
  // if mag referesh ng page, so dapat may checker sa app.jsx na mag seset ng user
  
  console.log(user)

  const [Wide, setWide] = useState(false)
  const [showAddProj, setAddProj] = useState({ show: false, data: {} })
  const [showAddTask, setAddTask] = useState({ show: false, data: {} })

  // ilagay ko pa ito sa context, but idk how kunin or what, so i'll just leave it here
  const [loggedIn, setLoggedIn] = useState(true)

  // context
  const [reload, setReload] = useState(false);
  const [addUser, setAddUser] = useState(false);

  const notLoggedIn = createBrowserRouter([
    {
      path: "*",
      element: <Error404 />,
    },
    {
      index: true,
      element: (
        <div className={`h-screen w-full bg-[#e4dede]`}>
          <Header loggedIn={false} />
          <div className="bg-[#e4dede]">
            <Landing />
          </div>
          <Footer />
        </div>
      ),
    },
    {
      path: "/forgotpassword",
      element: (
        <div className={`h-screen w-full bg-[#e4dede]`}>
          <Header loggedIn={loggedIn} disableMiddleLinks={true} />
          <div className="">
            <LoginSignin />
          </div>
          <Footer />
        </div>
      ),
    },
  ]);

  const isLoggedIn = createBrowserRouter([
    {
      // for testing purposes (dito mo ilagay ang link remz, change mo lang yung element)
      path : "/test",
      element: <FormSample />,
    },
    {
      path: "*",
      element: <Error404 />,
    },
    {
      path: "/login",
      element: (
        <div className={`h-screen w-full bg-[#e4dede]`}>
          <Header loggedIn={false} disableMiddleLinks={true} />
          <div className=" ">
            <LoginSignin />
          </div>
          <Footer />
        </div>
      ),
    },
    {
      path: "/signup",
      element: (
        <div className={`h-screen w-full bg-[#e4dede]`}>
          <Header loggedIn={loggedIn} disableMiddleLinks={true} />
          <div className="">
            <LoginSignin />
          </div>
          <Footer />
        </div>
      ),
    },
    {
      index: true,
      element: (
        <div className={`h-screen w-full bg-[#e4dede]`}>
          <Header loggedIn={loggedIn} />
          <div className="bg-[#e4dede]">
            <Landing />
          </div>
          <Footer />
        </div>
      ),
    },
    {
      path: "/forgotpassword",
      element: (
        <div className={`h-screen w-full bg-[#e4dede] `}>
          <Header loggedIn={loggedIn} />
          <div className="">
            <LoginSignin />
          </div>
          <Footer />
        </div>
      ),
    },
    {
      path: "/project",
      element: (
      <div className={`min-h-screen w-full bg-[#e4dede]`}>
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
            <div className="w-full max-h-screen overflow-auto bg-[#e4dede] scroll-smooth">
            <Tasks setAddTask={setAddTask}/>
            </div>
          </div>
          {showAddTask.show ? <NewTask setAddTask={setAddTask} /> : null}
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
            <div className="w-full max-h-screen overflow-auto bg-[#e4dede] scroll-smooth">
            <Tasks setAddTask={setAddTask} />
            </div>
          </div>
          {showAddTask.show ? <NewTask setAddTask={setAddTask} /> : null}
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
            <div className="w-full max-h-screen overflow-auto bg-[#e4dede] scroll-smooth">
            <Users />
            </div>
          </div>
          {addUser ? <NewUser /> : null}
          {showAddTask.show ? <NewTask setAddTask={setAddTask} /> : null}
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
            <div className="w-full max-h-screen overflow-auto bg-[#e4dede] scroll-smooth">
            <Settings />
            </div>
          </div>
          {showAddTask.show ? <NewTask setAddTask={setAddTask} /> : null}
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
            <div className="w-full max-h-screen overflow-auto bg-[#e4dede] scroll-smooth">
            <Subtask />
            </div>
          </div>
          {showAddTask.show ? <NewTask setAddTask={setAddTask} /> : null}
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
            <div className="w-full max-h-screen overflow-auto bg-[#e4dede] scroll-smooth">
            <Dashboard />
            </div>
          </div>
          {showAddTask.show ? <NewTask setAddTask={setAddTask} /> : null}
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
            <div className="w-full max-h-screen overflow-auto bg-[#e4dede] scroll-smooth">
            <Calendar />
            </div>
          </div>
          {showAddTask.show ? <NewTask setAddTask={setAddTask} /> : null}
        </div>
      )
    },
    {
      path: "/user/settings",
      element: (
      <div className={`h-screen w-full`}>
        <Header loggedIn={loggedIn} />
        <div className="flex flex-col h-screen">
          <UserSettings />
        </div>
        <Footer />
      </div>
      ),
    },
  ]);

  return (
    <div className="bg-[#e4dede]">
    
    <AddUser.Provider value={{addUser, setAddUser}}>
      <ReloadContext.Provider value={{reload, setReload}}>
        {/* {user.user_id !== "" ? (
        <RouterProvider router={isLoggedIn} fallbackElement={<SpinnerOfDoom />}/>
        ) : (
        <RouterProvider router={notLoggedIn} fallbackElement={<SpinnerOfDoom />}/>
        )} */}
        <RouterProvider router={isLoggedIn} fallbackElement={<SpinnerOfDoom />}/>
      </ReloadContext.Provider>
    </AddUser.Provider>
    
    </div>
  )
}

export default App


  
