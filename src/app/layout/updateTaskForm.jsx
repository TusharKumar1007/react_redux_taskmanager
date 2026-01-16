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

        dispatch(updateTask({ id, title: userTask }));
        setuserTask("");
      }}
      className=" flex gap-1" >
      <input
        type="text"
        placeholder="read a book."
        className="h-10 w-full px-2 outline-0 bg-[#363535] transition-all placeholder:text-slate-300 focus:placeholder:text-transparent"
        spellCheck="false"
        value={userTask}
        onChange={(e) => setuserTask(e.target.value)}
        required
        autoFocus
        onFocus={e => e.target.select()}
      />
      <button className="ml-2 outline-0 rounded cursor-pointer transition-all font-semibold text-amber-500">
        <i class="fa-solid fa-pen"></i>
      </button>
    </form >
  );
}
