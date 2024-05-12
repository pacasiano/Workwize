
import Error from "../../assets/Error.svg"

export default function Error404() {

    return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#e4dede]">
        <div className="flex flex-col bg-white justify-center text-center items-center font-mono p-10 gap-7 rounded-xl drop-shadow-2xl">
            <object type="image/svg+xml" data={Error} className="w-80">
                Your browser does not support SVG
            </object>
            <div className='flex flex-col gap-3'>
                <h1 className="text-5xl font-semibold">{"Error 404"}</h1>
                <p>{"We're sorry, but the page you requested could not be found."}</p>
            </div>
        </div>
    </div>

);
}
