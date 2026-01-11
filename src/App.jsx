import Task from "./app/features/task";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTasks } from "./app/features/taskSlice";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks())

  }, [dispatch])
  return (
    <div className="min-h-dvh flex justify-center items-center bg-slate-100">
      <Task />
    </div>
  );
}
