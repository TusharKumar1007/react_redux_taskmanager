import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import { logOut } from "../features/taskSlice";

export default function Header() {
    const dispatch = useDispatch();
    const userName = useSelector(state => state.tasks.userName);
    const logOutInProg = useSelector(state => state.tasks.logOutInProgress)

    const location = useLocation()
    const pathName = location.pathname

    return (
        <>
            {userName ? (
                <div className="md:px-6 h-30 flex justify-between items-start">
                    <div className="flex justify-between items-center w-full">

                        <div className="flex gap-2 text-2xl">

                            <span className=" tracking-wide text-slate-200 capitalize font-semibold ">
                                Hey,
                            </span>
                            <span className="text-amber-400 cursor-pointer font-semibold capitalize">
                                <Link to="/mytasks">
                                    {userName}
                                </Link>
                            </span>
                        </div>

                        <div className="flex gap-2">

                            <Link
                                to={pathName === '/setting' ? '/mytasks' : '/setting'}
                                className="transition-all   p-2 bg-yellow-500 dark-font  font-semibold rounded hover:translate-y-0.5 shadow-[2px_4px_5px_#2B2A2A] hover:shadow-[1px_2px_5px_#2B2A2A]"
                            >
                                {pathName === '/setting' ? 'My Tasks' : 'Account'}
                            </Link>
                            <button
                                className="transition-all bg-red-500 text-slate-200 font-semibold p-2 rounded  hover:translate-y-0.5 shadow-[2px_4px_5px_#2B2A2A] hover:shadow-[1px_2px_5px_#2B2A2A] cursor-pointer"
                                onClick={() => dispatch(logOut())}
                                disabled={logOutInProg}
                            >{logOutInProg ?

                                <i className="fa-solid fa-spinner animate-spin text-slate-200 " ></i>
                                : "Logout"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            ) : <Link onClick={() => {
                }} to={pathName === '/login' ? `/` : "/login"} className="transition-all dark-font bg-yellow-400 py-2 px-4 rounded font-semibold shadow-[4px_4px_5px_#2B2A2A] hover:shadow-[2px_2px_5px_#2B2A2A] mb-5 block w-fit">{pathName === '/login' ? "Temporary Tasks" : " Login/Register"}</Link>}

            {userName && pathName !== '/setting' && <Navigate to="/mytasks" />}


        </>
    )

}