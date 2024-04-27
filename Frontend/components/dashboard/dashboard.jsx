import Topbar from "../general/topbar"

export default function Dashboard() {

    return (
        <div className="max-h-screen">
            <Topbar setTitle={"Dashboard"} />
            <div className="w-full h-full">
                Dash
            </div>
        </div>
    )

}