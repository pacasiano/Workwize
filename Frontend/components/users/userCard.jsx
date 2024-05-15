
import Select from "react-select"
import PropTypes from "prop-types"
import { Cancel } from "../../assets/icons"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const UserCard = ({user, reload, setReload}) => {

    UserCard.propTypes = {
        user: PropTypes.object.isRequired,
        reload: PropTypes.bool.isRequired,
        setReload: PropTypes.func.isRequired
    };

    const { id } = useParams()

    const setUserRole = (e) => {
        // change role of user

        fetch(`http://localhost:8000/projects/${id}/users/${user.user_id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({role: e.value})
        })
        .then(res => res.json())
        .then(data => {
            toast.success(`Role of ${user.first_name} ${user.last_name} changed to ${e.value}`)
            setReload(!reload)
            console.log(data)
        })

        
    }

    const removeUser = () => {
        // remove user from project

        if(user.role === 'owner'){
            toast.error("Cannot remove project manager")
            return
        }

        fetch(`http://localhost:8000/projects/${id}/users/${user.user_id}/`, {
            method: 'DELETE',
        })
        .then(() => {
        toast.success(`${user.first_name} ${user.last_name} removed from project`)
        setReload(!reload)
        })
    }


    return (
        <div className="flex flex-row justify-between items-center gap-1">
            <div className="flex flex-col">
                <div className="font-bold text-lg">{user.first_name} {user.last_name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
            </div>
            <div className="flex flex-row gap-2">
                {user.role !== 'owner' && (<>
                <Select onChange={setUserRole} placeholder={user.role} options={user.role === 'manager' ? [{ value: 'member', label: 'member' }] : [{ value: 'manager', label: 'manager' }]} />
                <button onClick={removeUser} className="flex flex-row  gap-1  justify-center items-center text-sm bg-neutral-800/20 text-black rounded-md h-9 px-2"><Cancel />Remove</button>
                </>)}
            </div>
        </div>

    )
}