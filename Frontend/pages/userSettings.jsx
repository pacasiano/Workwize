import { useEffect, useState } from "react";
import Username from "../components/userSettings/username"
import Email from "../components/userSettings/email"
import Password from "../components/userSettings/password";
import FirstName from "../components/userSettings/firstName";
import LastName from "../components/userSettings/lastName";

export default function UserSettings() {

    const [user, setUser] = useState({})

    useEffect(() => {
        // get user data where user_id = 1
        fetch(`http://localhost:8000/api/users/1/`)
        .then(res => res.json())
        .then(data => {
            setUser(data)
        });
    }, [])
    
    return (
        <div className="py-28 px-16 min-h-screen bg-[#e4dede]">
            <div className="flex flex-row gap-2 p-5 min-h-96 backdrop-blur-sm drop-shadow bg-white/50 rounded-xl min-w-[800px] ">
                <div className="p-5 flex flex-col gap-5 w-full">

                    <div className=" flex flex-col gap-2 text-xl font-medium">
                        Account Settings
                        <div className="text-sm font-normal text-neutral-500">
                            Manage your personal and account details
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 ">
                        <div>
                            <div className="font-bold text-lg border-b border-neutral-400">Account Information</div>
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 ">

                            <Username user={user} setUser={setUser} />

                            <Email user={user} setUser={setUser} />

                            <Password user={user} setUser={setUser} />
                            
                        </div>
                        <div>
                            <div className="font-bold text-lg border-b border-neutral-400">Personal Information</div>
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 ">

                            <div className="flex flex-row gap-3 w-full">
                                <FirstName user={user} setUser={setUser} />
                                <LastName  user={user} setUser={setUser} />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}