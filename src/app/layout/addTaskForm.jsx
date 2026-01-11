import { useDispatch } from "react-redux";
import { useState } from "react";

import { addTask } from "../features/taskSlice";

export function AddTaskForm() {
  const dispatch = useDispatch();
  const [userTask, setuserTask] = useState("");
  function prepareUserTask(userTaskInput) {
    return { id: Date.now(), title: userTaskInput, done: false, editMode:false };
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(addTask(prepareUserTask(userTask)));
        setuserTask("");
      }}
      className="mt-4">
      <input
        type="text"
        placeholder="read a book."
        className="h-10 w-4/5 px-2 border-b-2 outline-0 transition-all placeholder:text-slate-300 focus:placeholder:text-transparent"
        spellCheck="false"
        value={userTask}
        onChange={(e) => setuserTask(e.target.value)}
        required
      />
      <button className="ml-2 outline-0 px-4 py-2 rounded cursor-pointer transition-all bg-teal-700 font-semibold hover:bg-teal-600 ">
        Add
      </button>
    </form>
  );
}
