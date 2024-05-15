
import { useContext, useEffect, useState } from "react";
import Topbar from "../components/general/topbar"
import { useParams } from "react-router-dom"
import { ReloadContext } from "../context/contexts"
import { UserAdd } from "../assets/icons";
import { AddUser } from "../context/addUser";
import { UserCard } from "../components/users/userCard";

export default function Users() {

    
    const { reload, setReload } = useContext(ReloadContext)
    const {setAddUser} = useContext(AddUser)

    const { id } = useParams();
    const [search, setSearch] = useState("")
    const [idsOfUsers, setIdsOfUsers] = useState([1])
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])

    // Fetch users in user-projects where project_id = id
    useEffect(() => {
        const fetchUserProjs = async () => {
          try {
            const accessToken = sessionStorage.getItem('accessToken');
      
            //Redirect to login if there's no access token
            if (!accessToken) {
                window.location.href = "http://localhost:5173/login"
              return;
            }
      
            const response = await fetch(`http://localhost:8000/user-projects/`, {
                headers: {
                    'Authorization': `JWT ${accessToken}`, 
                },
            });
      
            if (!response.ok) {
              throw new Error(`Error fetching user-projects inside try block: ${response.status}`);
            }
      
            const data = await response.json();
            // get all users where project_id = id
            let users = data.filter(user => user.project_id === parseInt(id))
            setIdsOfUsers(users)
          } catch (error) {
            console.error('Error fetching user-projects in catch block: ', error);
          }
        };
      
        fetchUserProjs();
    }, [id, reload]);


    // Fetch users in users where user_id = idsOfUsers.user_id
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const accessToken = sessionStorage.getItem('accessToken');
      
            //Redirect to login if there's no access token
            if (!accessToken) {
                window.location.href = "http://localhost:5173/login"
              return;
            }
      
            const response = await fetch(`http://localhost:8000/users/`, {
                headers: {
                    'Authorization': `JWT ${accessToken}`, 
                },
            });
      
            if (!response.ok) {
              throw new Error(`Error fetching users inside try block: ${response.status}`);
            }
      
            const data = await response.json();
            // gets all users where user_id = idsOfUsers.user_id, then add a new value to the object (role)
            let users = data.filter(user => idsOfUsers.some(id => id.user_id === user.user_id)).map((user) => {
                let role = idsOfUsers.filter(id => id.user_id === user.user_id).map((id) => id.role)
                user.role = role[0]
                return user
            })
            setUsers(users)
          } catch (error) {
            console.error('Error fetching users in catch block: ', error);
          }
        };
      
        fetchUsers();
    }, [id, idsOfUsers, reload]);
    

    useEffect(() => {

        if (search === null || search === "") {
            setFilteredUsers(users)
            return
        }

        let value = search
        let filteredUsers = users.filter(user => {
            return user.first_name.toLowerCase().includes(value.toLowerCase()) || user.last_name.toLowerCase().includes(value.toLowerCase())
        })
        setFilteredUsers(filteredUsers)
    
    }, [search, users, reload])

    return (
        <div className="max-h-screen">
            <Topbar setTitle={"Users"} />
            <section className="p-10">
                <main className='bg-[#fbf9f7] rounded-xl'>
                    <div className="p-10 flex flex-col gap-5 w-full">

                        <div className=" flex flex-row justify-between text-xl font-medium">
                            Collaborators
                            <div onClick={()=> setAddUser(true)} className="flex flex-row justify-between items-center cursor-pointer gap-2 bg-neutral-700/20 hover:bg-neutral-700/40 px-2 rounded-md font-normal text-sm select-none">
                                <UserAdd />
                                Add User
                            </div>
                        </div>
                        <div>
                            <div>
                                <input onChange={(e)=> setSearch(e.target.value)} defaultValue={search} type="text" placeholder="Filter by name" className="max-w-52 p-2 outline-neutral-500 rounded-md border border-gray-300" />
                            </div>
                            <div className="pt-3">
                                <div className="flex flex-col justify-start w-full items-start border-t max-h-96 overflow-y-auto">
                                    {filteredUsers.map((user) => (
                                        <div key={user.user_id} className="flex flex-col w-full gap-2 p-3 max-h-20  border-b  ">
                                            <UserCard user={user} reload={reload} setReload={setReload} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
            
    )
}
