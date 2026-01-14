import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Task from "./app/features/task";
import LoginForm from "./app/layout/loginForm"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./app/features/taskSlice";
// import { getTasks } from "./app/features/taskSlice";
function RequireAuth({ children }) {
  const gotUser = useSelector((state) => state.tasks.gotUser);

  return gotUser ? children : <Navigate to="/" />;
}
export default function App() {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.tasks.userName);

  // const gotUser = useSelector(state => state.tasks.gotUser)
  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getTasks())

  // }, [dispatch])
  // return (
  //   <div className="min-h-dvh flex justify-center items-center bg-slate-100">
  //     <Task />
  //   </div>
  // );

  return (
    <div className="min-h-dvh flex justify-center items-center bg-slate-800">
      <h2 className="text-2xl tracking-wide text-slate-200 capitalize font-semibold absolute right-8 top-4">{userName && <span>Hello, <span className="text-amber-400">{userName}</span></span>}</h2>
      <Router>

        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/mytasks"
            element={
              <RequireAuth>
                <Task />
              </RequireAuth>
            } />

        </Routes>
      </Router >
    </div>
  )
}
