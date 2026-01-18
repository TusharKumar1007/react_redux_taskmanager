import { useSelector, useDispatch } from "react-redux";
import { removeTask, toggleEditMode, toggleTaskDone, updateDoneTask } from "./taskSlice";
import { AddTaskForm } from "../layout/addTaskForm";
import { UpdateTaskForm } from "../layout/updateTaskForm";
import { deleteTask } from "./taskSlice";

export default function Task() {
  let curTasks = useSelector((state) => state.tasks.tasks);
  // curTasks.reverse()
  curTasks = [...curTasks].reverse()




  const dispatch = useDispatch();
  return (
    <div className="flex justify-center items-center">

      <div className="w-full flex flex-col gap-2 items-center justify-center shadow-2xs sm:w-3/5 lg:w-1/2 ">

        <AddTaskForm />
        <div className="p-4 dark-bg text-slate-200 transition-all rounded w-full shadow-2xl">
          {/* <Header /> */}

          <ul className="mt-4">
            {curTasks.length > 0 ?
              curTasks.map((task) => {

                return (
                  <div
                    key={task.id}
                    className={`flex gap-2 justify-between mt-2 px-4 items-center py-2 transition-all hover:bg-[#484545] rounded ${task.completed && "opacity-50 hover:opacity-100"}`}>
                    <div className="flex gap-4 justify-center items-center">
                      <input
                        className=" rounded-xs cursor-pointer"
                        type="checkbox"
                        onChange={(e) => {

                          dispatch(updateDoneTask({ id: task.id, isDone: e.target.checked }))
                          dispatch(
                            toggleTaskDone({ id: task.id, isDone: e.target.checked })
                          )
                        }
                        }
                        checked={task.completed}
                      />
                      {!task.ineditmode ? (
                        <li
                          title="Edit"
                          onClick={() =>
                            dispatch(
                              toggleEditMode({ id: task.id, goEditMode: true })
                            )
                          }
                          className={` text sm:text-xl capitalize cursor-pointer ${task.completed && "line-through"
                            }`}>
                          {task.task}
                        </li>
                      ) : (
                        <UpdateTaskForm id={task.id} title={task.task} />
                      )}
                      <span className="text-xs text-slate-500">{new Date(`${task.updatedat}`)
                        .toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</span>
                    </div>
                    <button
                      onClick={() => {
                        dispatch(removeTask(task.id))
                        dispatch(deleteTask(task.id))
                      }}
                      className=" rounded  font-semibold cursor-pointer text-red-500 ">
                      <i className="fa-solid fa-trash"></i>

                    </button>
                  </div>
                );
              }) : <h2 className="text-7xl text-slate-300 mt-2 p-4">No Task yet...</h2>}
          </ul>
        </div>
      </div>
    </div>
  );
}
