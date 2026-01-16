import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Task from "./app/features/task";
import LoginForm from "./app/layout/loginForm"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./app/features/taskSlice";
import { logOut } from "./app/features/taskSlice";
import AccountForm from './app/layout/account'
function RequireAuth({ children }) {
  const gotUser = useSelector((state) => state.tasks.gotUser);

  return gotUser ? children : <Navigate to="/" />;
}
export default function App() {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.tasks.userName);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <div className=" min-h-dvh flex justify-center items-center transition-all bg-linear-to-br from-[#D02752] to-[#F63049]" style={{ fontFamily: "Inter" }}>

        {userName && (
          <div>
            <span className="text-2xl tracking-wide text-slate-200 capitalize font-semibold absolute left-8 top-4">
              Hey, <span className="text-amber-400 mr-2 cursor-pointer"><Link to="/mytasks">
                {userName}
              </Link>
              </span>
            </span>


            <Link
              to="/setting"
              className="transition-all mr-2 absolute right-25 top-4 p-2 bg-yellow-500 text-[#2B2A2A]  font-semibold rounded hover:translate-y-0.5 shadow-[2px_4px_5px_#2B2A2A] hover:shadow-[1px_2px_5px_#2B2A2A]"
            >
              Account
            </Link>
            <button
              className="transition-all ml-4 bg-red-500 text-slate-200 font-semibold p-2 rounded  absolute right-8 top-4 hover:translate-y-0.5 shadow-[2px_4px_5px_#2B2A2A] hover:shadow-[1px_2px_5px_#2B2A2A] cursor-pointer"
              onClick={() => dispatch(logOut())}
            >
              Logout
            </button>
          </div>
        )}

        <Routes>
          <Route path="/" element={<LoginForm />} />

          <Route
            path="/mytasks"
            element={
              <RequireAuth>
                <Task />
              </RequireAuth>
            }
          />

          <Route
            path="/setting"
            element={
              <RequireAuth>
                <AccountForm />
              </RequireAuth>
            }
          />
        </Routes>

      </div>
    </Router>
  );
}
