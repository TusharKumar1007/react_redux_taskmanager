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
      <div className="min-h-dvh flex justify-center items-center transition-all bg-slate-900">

        {userName && (
          <div>
            <span className="text-2xl tracking-wide text-slate-200 capitalize font-semibold absolute left-8 top-4">
              Hello, <span className="text-amber-400 mr-2">{userName}</span>
            </span>

            <button
              className="mr-2 bg-red-700 text-slate-200 font-semibold py-1 px-1 rounded shadow hover:bg-red-600 absolute right-24 top-4"
              onClick={() => dispatch(logOut())}
            >
              Logout
            </button>

            <Link
              to="/setting"
              className="ml-2 absolute right-8 top-4 p-1 bg-amber-700 text-slate-200 font-semibold rounded hover:bg-amber-600"
            >
              Account
            </Link>
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
