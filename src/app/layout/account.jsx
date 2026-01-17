import { useDispatch } from "react-redux";
import { deleteUser } from "../features/taskSlice";
import { useState } from "react";


export default function AccountForm() {
    const dispatch = useDispatch()
    const [userInput, setUserInput] = useState("")
    return (
        <div className="flex items-center justify-center min-h-[50vh]">

            <div className="w-full sm:w-3/5 lg:w-1/2 dark-bg py-2  rounded text-center shadow-2xl">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (userInput.toLocaleLowerCase() === "yes") {

                        dispatch(deleteUser())
                    }

                }

                }>
                    <input onChange={(e) => setUserInput(e.target.value)} type="text" placeholder="types 'yes'  to delete account" className="transition-all outline-0 placeholder:text-slate-400 placeholder:text-xs md:placeholder:text-slate-400 md:placeholder:text-xl text-slate-300 w-3/5 py-2 px-1 rounded hover:bg-[#4a4848]" spellCheck={false} required />
                    <button className="text-xs md:text-xl cursor-pointer transition-all ml-4 bg-red-600 text-slate-200 font-semibold p-2 rounded hover:translate-y-0.5 shadow-[2px_4px_5px_#2B2A2A] hover:shadow-[1px_2px_5px_#2B2A2A]">Delete Acount</button>
                </form>
            </div>
        </div>
    )
}
