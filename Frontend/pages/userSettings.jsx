import Username from "../components/userSettings/username"
import Email from "../components/userSettings/email"
import Password from "../components/userSettings/password";
import FirstName from "../components/userSettings/firstName";
import LastName from "../components/userSettings/lastName";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserSettings() {

    const { user, setUser } = useContext(UserContext);
    const { clearUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        clearUserData();
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('userData');
        toast.success("Logged out successfully");
        navigate("/");

    }
    
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
                        <div>
                            <div className="font-bold text-lg border-b border-neutral-400"></div>
                        </div>
                        <div className="flex flex-row gap-3 justify-start items-center">
                            <button onClick={logout} className="bg-neutral-500 text-white rounded-lg px-5 py-2 hover:bg-red-600">Log out</button>
                            <div className="text-sm text-neutral-500">Log out of your account</div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}