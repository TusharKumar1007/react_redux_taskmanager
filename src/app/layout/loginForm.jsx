import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";

// import { addTask } from "../features/taskSlice";
import { getUser,registerUser } from "../features/taskSlice";
// import { prepareUserTask } from "../../services/taskApi";

export default function LoginForm() {
    const dispatch = useDispatch();
    const error = useSelector(state => state.tasks.error)

    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [inLogin, setInLogin] = useState(true)

    return (
        <main className="w-4/5 flex flex-col items-center">
            {error ? <h2 className="text-slate-200 px-4 py-2 bg-red-600 rounded mb-4 font-semibold text-xl">{error}</h2> : null}
            <div className="w-2/5 bg-slate-600 flex flex-col gap-2 items-center p-4 shadow-2xl rounded">
                <div className="flex gap-2 bg-slate-500 rounded self-end">

                    <span onClick={() => setInLogin(!inLogin)} className={`cursor-pointer py-2 px-2 rounded font-semibold ${inLogin ? "bg-amber-600 text-slate-200" : null}`}>Login</span>
                    <span onClick={() => setInLogin(!inLogin)} className={`cursor-pointer py-2 px-2 rounded font-semibold ${!inLogin ? "bg-amber-600 text-slate-200" : null}`}>Register</span>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        inLogin ?
                            dispatch(getUser({ email, password })) :
                            dispatch(registerUser({ userName, email, password }));

                        setEmail("");
                        setPassword("")
                        setUserName("")
                    }}
                    className="mt-4 flex flex-col gap-2 p-4 bg-slate-600 rounded w-full items-center">
                    <input
                        type="email"
                        placeholder="joe@email.com"
                        className="text-slate-200 h-10 w-4/5 px-2 border-b-2 outline-0 transition-all placeholder:text-slate-300 focus:placeholder:text-transparent"
                        spellCheck="false"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {
                        !inLogin &&
                        <input
                            type="text"
                            placeholder="user name"
                            className="text-slate-200 h-10 w-4/5 px-2 border-b-2 outline-0 transition-all placeholder:text-slate-300 focus:placeholder:text-transparent"
                            spellCheck="false"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    }
                    <input
                        type="password"
                        placeholder="Your Password"
                        className="text-slate-200 h-10 w-4/5 px-2 border-b-2 outline-0 transition-all placeholder:text-slate-300 focus:placeholder:text-transparent"
                        spellCheck="false"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="text-slate-200 font-semibold mt-2 outline-0 px-4 py-2 rounded cursor-pointer transition-all bg-teal-700 hover:bg-teal-600 w-4/5 ">
                        {!inLogin ? "Register" : "Login"}
                    </button>
                </form>
            </div>
        </main>
    );
}
