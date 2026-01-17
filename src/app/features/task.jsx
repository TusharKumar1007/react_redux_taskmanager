import { useSelector, useDispatch } from "react-redux";
import { removeTask, toggleEditMode, toggleTaskDone, updateDoneTask } from "./taskSlice";
import { AddTaskForm } from "../layout/addTaskForm";
import { UpdateTaskForm } from "../layout/updateTaskForm";
import { deleteTask } from "./taskSlice";

export default function Task() {
  let curTasks = useSelector((state) => state.tasks.tasks);
  curTasks = curTasks.slice().sort((a, b) => b.taskId - a.taskId);

  const dispatch = useDispatch();
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center text-center shadow-2xs sm:w-3/5 lg:w-1/2 ">

      <AddTaskForm />
      <div className="p-4 bg-[#2B2A2A] text-slate-200 transition-all rounded text-center w-full shadow-2xl">
        {/* <Header /> */}

        <ul className="mt-4">
          {curTasks.length > 0 ?
            curTasks.map((task) => {
              return (
                <div
                  key={task.taskId}
                  className={`flex gap-2 justify-between mt-2 px-4 items-center py-2 transition-all ${task.done && "opacity-50 hover:opacity-100"}`}>
                  <div className="flex gap-4 justify-center">
                    <input
                      className=" rounded-xs cursor-pointer"
                      type="checkbox"
                      onChange={(e) => {

                        dispatch(updateDoneTask({ id: task.taskId, isDone: e.target.checked }))
                        dispatch(
                          toggleTaskDone({ id: task.taskId, isDone: e.target.checked })
                        )
                      }
                      }
                      checked={task.done}
                    />
                    {!task.editMode ? (
                      <li
                        title="Edit"
                        onClick={() =>
                          dispatch(
                            toggleEditMode({ id: task.taskId, goEditMode: true })
                          )
                        }
                        className={`text sm:text-xl capitalize cursor-pointer ${task.done && "line-through"
                          }`}>
                        {task.title}
                      </li>
                    ) : (
                      <UpdateTaskForm id={task.taskId} title={task.title} />
                    )}
                  </div>
                  <button
                    onClick={() => {
                      dispatch(removeTask(task.taskId))
                      dispatch(deleteTask(task.taskId))
                    }}
                    className=" rounded  font-semibold cursor-pointer text-red-500 ">
                    <i class="fa-solid fa-trash"></i>

                  </button>
                </div>
              );
            }) : <h2 className="text-7xl text-slate-300 mt-2 p-4">No Task yet...</h2>}
        </ul>
      </div>
    </div>
  );
}
