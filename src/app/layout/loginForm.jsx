import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { getUser, registerUser } from "../features/taskSlice";


export default function LoginForm() {
    const dispatch = useDispatch();
    const error = useSelector(state => state.tasks.error)
    const gotUser = useSelector(state => state.tasks.gotUser)

    const navigate = useNavigate();


    useEffect(() => {
        if (gotUser) {

            navigate("/mytasks");
        }
    }, [gotUser, navigate])

    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [inLogin, setInLogin] = useState(true)

    return (
        <main className="w-full lg:w-1/2 flex flex-col items-center">
            {error ? <h2 className="text-slate-200 px-4 py-2 bg-red-700 rounded mb-4 font-semibold text-xl shadow-2xl">{error}</h2> : null}
            <div className="w-full lg:w-3/5 bg-[#2B2A2A] flex flex-col gap-2 items-center p-4 shadow-2xl rounded">
                <div className="flex gap-2 bg-[#3a3838] rounded self-end">

                    <span onClick={() => setInLogin(!inLogin)} className={`cursor-pointer py-2 px-2 rounded font-semibold text-slate-400 ${inLogin ? "bg-yellow-500 text-[#2B2A2A]!" : null}`}>Login</span>
                    <span onClick={() => setInLogin(!inLogin)} className={`cursor-pointer py-2 px-2 rounded font-semibold text-slate-400 ${!inLogin ? "bg-yellow-500 text-[#2B2A2A]!" : null}`}>Register</span>
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
                    className="mt-4 flex flex-col gap-2 p-4  rounded w-full items-center">
                    <input
                        type="email"
                        placeholder="joe@email.com                        Email"
                        className="text-slate-200 h-10 w-full px-2 border-b-2 outline-0 transition-all placeholder:text-slate-300 "
                        spellCheck="false"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {
                        !inLogin &&
                        <input
                            type="text"
                            placeholder="Tiger                                User Name"
                            className="text-slate-200 h-10 w-full px-2 border-b-2 outline-0 transition-all placeholder:text-slate-300 "
                            spellCheck="false"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    }
                    <input
                        type="password"
                        placeholder="Your Password                  Password"
                        className="text-slate-200 h-10 w-full px-2 border-b-2 outline-0 transition-all placeholder:text-slate-300 "
                        spellCheck="false"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="text-[#2B2A2A] font-semibold mt-4 outline-0 px-4 py-2 rounded cursor-pointer transition-all bg-yellow-500 hover:bg-yellow-600 w-4/5 ">
                        {!inLogin ? "Register" : "Login"}
                    </button>
                </form>
            </div>
        </main>
    );
}
