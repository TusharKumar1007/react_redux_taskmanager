import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Task from "./app/features/task";
import LoginForm from "./app/layout/loginForm"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser, toggleOnAccountPage } from "./app/features/taskSlice";
import { logOut, toggleOnLoginPage, toggleOnTempTaskPage } from "./app/features/taskSlice";
import AccountForm from './app/layout/account'
import TempTask from './app/features/tempNotes'

function RequireAuth({ children }) {
  const gotUser = useSelector((state) => state.tasks.gotUser);

  return gotUser ? children : <Navigate to="/" />;
}
export default function App() {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.tasks.userName);
  const logOutInProg = useSelector(state => state.tasks.logOutInProgress)
  const onTempTaskPage = useSelector(state => state.tasks.onTempTaskPage)
  const OnLoginPage = useSelector(state => state.tasks.onLoginPage)
  const onAccountPage = useSelector(state => state.tasks.onAccountPage)

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="p-4 min-h-dvh  transition-all  anim-bg" style={{ fontFamily: "Inter" }}>

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
                  to="/setting"
                  className="transition-all   p-2 bg-yellow-500 dark-font  font-semibold rounded hover:translate-y-0.5 shadow-[2px_4px_5px_#2B2A2A] hover:shadow-[1px_2px_5px_#2B2A2A]"
                  onClick={() => dispatch(toggleOnAccountPage(true))}
                >
                  Account
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
          dispatch(toggleOnTempTaskPage(!onTempTaskPage))
          dispatch(toggleOnLoginPage(!OnLoginPage))
        }} to={onTempTaskPage ? `/login` : "/"} className="transition-all dark-font bg-yellow-400 py-2 px-4 rounded font-semibold shadow-[4px_4px_5px_#2B2A2A] hover:shadow-[2px_2px_5px_#2B2A2A] mb-5 block w-fit">{onTempTaskPage ? "Login/Register" : "Temporary Tasks"}</Link>}

        {userName && !onAccountPage && <Navigate to="/mytasks" />}
        <Routes>
          <Route path="/" element={<TempTask />} />
          <Route path="/login" element={<LoginForm />} />

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
    </Router >
  );
}
