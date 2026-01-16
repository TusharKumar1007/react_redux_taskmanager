import { useDispatch } from "react-redux";
import { deleteUser } from "../features/taskSlice";
import { useState } from "react";


export default function AccountForm() {
    const dispatch = useDispatch()
    const [userInput, setUserInput] = useState("")
    return (
        <div className="w-1/2 bg-slate-300 p-4 rounded text-center shadow">
            <form onSubmit={(e) => {
                e.preventDefault();
                if (userInput.toLocaleLowerCase() === "yes") {

                    dispatch(deleteUser())
                }

            }

            }>
                <input onChange={(e) => setUserInput(e.target.value)} type="text" placeholder="types 'yes'  to delete account" className="outline-0 placeholder:text-slate-600 border-b-2 w-3/5" spellCheck={false} required />
                <button className="ml-2 bg-red-700 font-semibold text-slate-200 p-1 rounded cursor-pointer hover:bg-red-600">Delete Acount</button>
            </form>
        </div>
    )
}
