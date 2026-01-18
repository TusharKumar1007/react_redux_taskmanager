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
      <div className="p-4 min-h-dvh  transition-all  anim-bg" style={{ fontFamily: "Inter" }}>

        {userName && (
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
                  to="/setting"
                  className="transition-all   p-2 bg-yellow-500 dark-font  font-semibold rounded hover:translate-y-0.5 shadow-[2px_4px_5px_#2B2A2A] hover:shadow-[1px_2px_5px_#2B2A2A]"
                >
                  Account
                </Link>
                <button
                  className="transition-all bg-red-500 text-slate-200 font-semibold p-2 rounded  hover:translate-y-0.5 shadow-[2px_4px_5px_#2B2A2A] hover:shadow-[1px_2px_5px_#2B2A2A] cursor-pointer"
                  onClick={() => dispatch(logOut())}
                >
                  Logout
                </button>
              </div>
            </div>
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
