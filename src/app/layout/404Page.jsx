import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <div className="flex justify-center items-center min-h-70 ">
            <div className="rounded-md dark-bg p-4 space-y-4 text-center shadow-2xl">

                <h1 className="text-4xl font-semibold text-slate-50">Page you are looking for does not exist</h1>
                <Link to='/' className=" rounded w-full px-4 py-2 bg-yellow-400 dark-font font-semibold cursor-pointer text-xl shadow-2xl hover:bg-yellow-300 transition-all">Temperory Tasks</Link>
            </div>
        </div>
    )
}

export default PageNotFound