import { useSelector, useDispatch } from "react-redux";
import { toggleEditMode, toggleTaskDone } from "./taskSlice";
import { Header } from "../layout/header";
import { AddTaskForm } from "../layout/addTaskForm";
import { UpdateTaskForm } from "../layout/updateTaskForm";
import { deleteTask } from "./taskSlice";

export default function Task() {
  let curTasks = useSelector((state) => state.tasks.tasks);
  curTasks = curTasks.slice().sort((a, b) => b.taskId - a.taskId);




  const dispatch = useDispatch();
  return (
    <div className="p-4 bg-slate-700 text-slate-200 transition-all rounded text-center w-1/2 shadow-2xl">
      <Header />
      <AddTaskForm />

      <ul className="mt-4">
        {curTasks.length > 0 ?
          curTasks.map((task) => {
            return (
              <div
                key={task.taskId}
                className={`flex gap-2 justify-between mt-2 px-4 items-center outline-2 outline-teal-500 rounded py-2 transition-all ${task.done && "outline-green-500! opacity-50 hover:opacity-100"}`}>
                <div className="flex gap-4 justify-center">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      dispatch(
                        toggleTaskDone({ id: task.taskId, isDone: e.target.checked })
                      )
                    }
                    checked={task.done}
                  />
                  {!task.editMode ? (
                    <li
                      onClick={() =>
                        dispatch(
                          toggleEditMode({ id: task.taskId, goEditMode: true })
                        )
                      }
                      className={`text-xl capitalize cursor-pointer ${task.done && "line-through"
                        }`}>
                      {task.title}
                    </li>
                  ) : (
                    <UpdateTaskForm id={task.taskId} title={task.title} />
                  )}
                </div>
                <button
                  onClick={() => dispatch(deleteTask(task.taskId))}
                  className="bg-red-700  rounded px-4 py-2 font-semibold cursor-pointer hover:bg-red-600">
                  Remove
                </button>
              </div>
            );
          }) : <h2 className="text-7xl text-slate-300 mt-2 p-4">No Task yet...</h2>}
      </ul>
    </div>
  );
}
