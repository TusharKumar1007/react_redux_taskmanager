import { useSelector, useDispatch } from "react-redux";
import { removeTask, toggleEditMode, toggleTaskDone, updateDoneTask } from "./taskSlice";
import { AddTaskForm } from "../layout/addTaskForm";
import { UpdateTaskForm } from "../layout/updateTaskForm";
import { deleteTask } from "./taskSlice";
import clipboard from 'clipboardy';
import { useState } from "react";
import gokuSleep from '/goku sleep_when_no_task.webp'

export default function Task() {
  let curTasks = useSelector((state) => state.tasks.tasks);
  const [clipboardStatus, setClipboardStatus] = useState({ id: null, type: 'fa-copy' })
  const [askBeforeDel, setAskBeforeDel] = useState({ id: null, display: false })

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
                    className={`flex gap-2 justify-between mt-2 px-4 items-center py-2 transition-all hover:bg-[#484545] rounded  relative group`}>
                    <div className="flex gap-4 justify-center items-center">
                      <input
                        className="peer rounded-xs cursor-pointer accent-green-400"
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
                          className=' text-xs sm:text-xl capitalize cursor-pointer peer-checked:line-through
                          decoration-green-400
                          group-has-[input:checked]:opacity-50
                            '>
                          {task.task}
                        </li>
                      ) : (
                        <UpdateTaskForm id={task.id} title={task.task} />
                      )}
                      <span className={`text-xs  text-[#2B2A2A] 
                      md:bg-transparent md:text-slate-500 absolute group-hover:text-[#2B2A2A] px-1 
                       ${!task.completed ? "bg-yellow-400 shadow-yellow md:shadow-none  md:group-hover:shadow-yellow md:group-hover:bg-yellow-400" :
                          "bg-green-400 shadow-green md:shadow-none  md:group-hover:shadow-green md:group-hover:bg-green-400"
                        } 
                       font-semibold rounded-full -top-2 left-1 w-fit text-center `}>{new Date(`${task.updatedat}`)
                          .toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</span>
                    </div>
                    <div className="flex gap-4">

                      <button
                        title="copy to clipboard"
                        onClick={() => {
                          clipboard.write(task.task)
                          setClipboardStatus({ id: task.id, type: "fa-check" })
                          setTimeout(() => setClipboardStatus({ id: task.id, type: "fa-copy" }), 1500)

                        }}
                        className=" rounded  font-semibold cursor-pointer hover:bg-slate-600 p-1 ">
                        <i className={`fa-solid ${task.id === clipboardStatus.id ? clipboardStatus.type : "fa-copy"} ${!task.completed ? "text-yellow-400" : "text-green-400"}`}></i>

                      </button>
                      <button
                        onClick={() => setAskBeforeDel({ id: task.id, display: true })}
                        className=" rounded  font-semibold cursor-pointer ">
                        <i className="fa-solid fa-trash text-red-500 "></i>

                      </button>
                      {
                        task.id === askBeforeDel.id && askBeforeDel.display &&

                        <span className="absolute font-semibold dark-bg rounded  -right-7.5 md:-right-12 -top-3 text-xs p-1">
                          Are you sure?
                          <div className="flex gap-2">

                            <button
                              onClick={() => {
                                dispatch(removeTask(task.id))
                                dispatch(deleteTask(task.id))

                              }}
                              className="transition-all cursor-pointer bg-gray-600 hover:gray-bg p-1 rounded hover:outline-green-400 hover:outline">Yes</button>
                            <button
                              onClick={() => setAskBeforeDel({ id: null, display: false })}
                              className="transition-all cursor-pointer bg-gray-600 hover:gray-bg p-1 rounded hover:outline-green-400 hover:outline" >No</button>
                          </div>
                        </span>
                      }
                    </div>
                  </div>
                );
              }) : <h2 className="text-5xl text-slate-300 mt-2 p-4 text-center ">
                <img src={gokuSleep} alt="" className="w-2/5 inline-block" /></h2>}
          </ul>
        </div>
      </div>
    </div>
  );
}
