import { useDispatch } from "react-redux";
import { useState } from "react";

// import { replaceTask } from "../features/taskSlice";
import { updateTask } from "../features/taskSlice";

export function UpdateTaskForm({ title, id }) {
  const dispatch = useDispatch();
  const [userTask, setuserTask] = useState(title);
  // function prepareUserTask(userTaskInput) {
  //   return {
  //     id: Date.now(),
  //     title: userTaskInput,
  //     done: false,
  //     editMode: false,
  //   };
  // }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        dispatch(updateTask({id, title:userTask}));
        setuserTask("");
      }}
      className=" flex gap-1" >
      <input
        type="text"
        placeholder="read a book."
        className="h-10 w-4/5 px-2 border-b outline-0 transition-all placeholder:text-slate-300 focus:placeholder:text-transparent"
        spellCheck="false"
        value={userTask}
        onChange={(e) => setuserTask(e.target.value)}
        required
        autoFocus
        onFocus={e=>e.target.select()}
      />
      <button className="ml-2 outline-0 px-4 py-2 rounded cursor-pointer transition-all bg-teal-700 font-semibold hover:bg-teal-600 ">
        Update
      </button>
    </form >
  );
}
