

const Footer = () => {
    return (
        <div className="w-full p-3 px-5 bg-neutral-800">
            <div className="flex flex-row justify-between items-center">
                {/* footer links */}
                <div className='mr-24 flex flex-row gap-5'>
                    <p className="text-white text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">About</p>
                    <p className="text-white text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">Contact</p>
                    <p className="text-white text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">FAQ</p>
                </div>
                <div>
                    <p className="text-white text-md font-bold transition-all ease-in-out hover:scale-105 hover:cursor-pointer">© 2024 Projects</p>
                </div>
            </div>
        </div>
    );
    }

export default Footer;