import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Task from "./app/features/task";
import LoginForm from "./app/layout/loginForm"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./app/features/taskSlice";
import AccountForm from './app/layout/account'
import TempTask from './app/features/tempNotes'
import PageNotFound from './app/layout/404Page'
import Header from "./app/layout/header";
import { randomNumIn } from '@tushardev01/farm-password'

function RequireAuth({ children }) {
  const gotUser = useSelector((state) => state.tasks.gotUser);

  return gotUser ? children : <Navigate to="/" />;
}
export default function App() {
  const dispatch = useDispatch();

  const bgClass = {
    largeScreen: {

      1: "md:bg-image-1",
      2: "md:bg-image-2",
      3: "md:bg-image-3",
    },
    smallScreen: {

      1: "bg-image-mobile-1",
      2: "bg-image-mobile-2",
      3: "bg-image-mobile-3",
      4: "bg-image-mobile-4",
    }
  };
  const bgLargeClass = bgClass.largeScreen[randomNumIn(1, Object.keys(bgClass.largeScreen).length)]
  const bgSmallClass = bgClass.smallScreen[randomNumIn(1, Object.keys(bgClass.smallScreen).length)]

  console.log(bgLargeClass);
  

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <div className={`p-4 min-h-dvh  transition-all ${bgSmallClass}  ${bgLargeClass}`} style={{ fontFamily: "Inter" }}>
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
