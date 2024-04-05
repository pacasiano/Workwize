import Topbar from "../general/topbar"

export default function Dashboard() {

    return (
        <div>
            <Topbar setTitle={"Dashboard"} />
            <div className="w-full h-full">
                Dash
            </div>
        </div>
    )

}