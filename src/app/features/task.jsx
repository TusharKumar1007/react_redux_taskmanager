import { useSelector, useDispatch } from "react-redux";
import { removeTask, toggleEditMode, updateTask } from "./taskSlice";
import { Header } from "../layout/header";
import { AddTaskForm } from "../layout/addTaskForm";
import { UpdateTaskForm } from "../layout/updateTaskForm";

export default function Task() {
  let curTasks = useSelector((state) => state.tasks.tasks);
  curTasks = curTasks.slice().sort((a, b) => b.id - a.id);

  console.log(curTasks);
  

  const dispatch = useDispatch();
  return (
    <div className="p-4 bg-slate-700 text-slate-200 rounded text-center w-1/2 shadow-2xl">
      <Header />
      <AddTaskForm />

      <ul className="mt-4">
        {curTasks.length > 0 &&
          curTasks.map((task) => {
            return (
              <div
                key={task.id}
                className={`flex gap-2 justify-between mt-2 px-4 items-center outline-2 outline-teal-500 rounded py-2 transition-all ${task.done && "outline-green-500! opacity-50 hover:opacity-100"}`}>
                <div className="flex gap-4 justify-center">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      dispatch(
                        updateTask({ id: task.id, isDone: e.target.checked })
                      )
                    }
                  />
                  {!task.editMode ? (
                    <li
                      onClick={() =>
                        dispatch(
                          toggleEditMode({ id: task.id, goEditMode: true })
                        )
                      }
                      className={`text-xl capitalize cursor-pointer ${task.done && "line-through"
                        }`}>
                      {task.title}
                    </li>
                  ) : (
                    <UpdateTaskForm id={task.id} title={task.title} />
                  )}
                </div>
                <button
                  onClick={() => dispatch(removeTask(task.id))}
                  className="bg-red-700  rounded px-4 py-2 font-semibold cursor-pointer hover:bg-red-600">
                  Remove
                </button>
              </div>
            );
          })}
      </ul>
    </div>
  );
}
