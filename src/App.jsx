import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Task from "./app/features/task";
import LoginForm from "./app/layout/loginForm"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./app/features/taskSlice";
import AccountForm from './app/layout/account'
import TempTask from './app/features/tempNotes'
import PageNotFound from './app/layout/404Page'
import Header from "./app/layout/header";

function RequireAuth({ children }) {
  const gotUser = useSelector((state) => state.tasks.gotUser);

  return gotUser ? children : <Navigate to="/" />;
}
export default function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="p-4 min-h-dvh  transition-all  anim-bg" style={{ fontFamily: "Inter" }}>
        <Header />

        <Routes>
          <Route path="*" element={<PageNotFound />} />
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
