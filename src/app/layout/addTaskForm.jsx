import { useDispatch } from "react-redux";
import { useState } from "react";

// import { addTask } from "../features/taskSlice";
import { createTask, addTask } from "../features/taskSlice";


export function AddTaskForm() {
  const dispatch = useDispatch();
  const [userTask, setuserTask] = useState("");


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const newTaskId = Date.now();
        dispatch(addTask({ newTaskId, userTask }));
        dispatch(createTask({ newTaskId, userTask }));
        setuserTask("");
      }}
      className="mb-4 w-full dark-bg p-2 rounded shadow-2xl">
      <button className=" outline-0 px-4 py-2 rounded cursor-pointer transition-all font-semibold text-slate-400">
        <i className="fa-solid fa-plus"></i>
      </button>
      <input
        type="text"
        placeholder="create a new task"
        className="h-10 w-4/5 px-2 text-slate-200 outline-0 transition-all placeholder:text-slate-300 "
        spellCheck="false"
        value={userTask}
        onChange={(e) => setuserTask(e.target.value)}
        required
      />
    </form>
  );
}
