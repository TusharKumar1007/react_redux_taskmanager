import { useSelector, useDispatch } from "react-redux";
import {
  removeTask,
  toggleEditMode,
  toggleTaskDone,
  updateDoneTask,
} from "./taskSlice";
import { AddTaskForm } from "../layout/addTaskForm";
import { UpdateTaskForm } from "../layout/updateTaskForm";
import { deleteTask } from "./taskSlice";
import clipboard from "clipboardy";
import { useState } from "react";
import gokuSleep from "/goku sleep_when_no_task.webp";
import {
  checkLinkExist,
  getHyperLink,
  hyperlinkDecorator,
} from "../utils/gethyperlink";

export default function Task() {
  let curTasks = useSelector((state) => state.tasks.tasks);
  const [clipboardStatus, setClipboardStatus] = useState({
    id: null,
    type: "fa-copy",
  });
  const [askBeforeDel, setAskBeforeDel] = useState({
    id: null,
    display: false,
  });
  const [showFullTask, setShowFullTask] = useState({ id: null, display: false })
  // curTasks.reverse()
  curTasks = [...curTasks].reverse();

  const dispatch = useDispatch();
  return (
    <div className="flex justify-center items-center">
      <div className="w-full flex flex-col gap-2 items-center justify-center shadow-2xs sm:w-3/5 lg:w-1/2 ">
        <AddTaskForm />
        <div className="p-2 dark-bg text-slate-200 transition-all rounded w-full shadow-2xl backdrop-blur-2xl">
          {/* <Header /> */}

          <ul className="mt-4">
            {curTasks.length > 0 ? (
              curTasks.map((task) => {
                return (
                  <div
                    key={task.id}
                    className={`flex gap-2 justify-between mt-3 px-3 items-center py-3 md:py-2 transition-all hover:bg-gray-500/20 rounded hover:shadow relative group`}>
                    <div className="flex gap-4 justify-start items-center min-w-0 flex-1 overflow-hidden">
                      <input
                        className="peer rounded-xs cursor-pointer accent-green-400 shrink-0"
                        type="checkbox"
                        onChange={(e) => {
                          dispatch(
                            updateDoneTask({
                              id: task.id,
                              isDone: e.target.checked,
                            }),
                          );
                          dispatch(
                            toggleTaskDone({
                              id: task.id,
                              isDone: e.target.checked,
                            }),
                          );
                        }}
                        checked={task.completed}
                      />
                      {!task.ineditmode ? (
                        <li
                          title="Edit"
                          onClick={(e) => {
                            if (e.target.closest("a")) {
                              return;
                            }

                            dispatch(
                              toggleEditMode({ id: task.id, goEditMode: true }),
                            );
                          }}
                          className={` text-xs sm:text-xl cursor-pointer peer-checked:line-through
                                                    decoration-green-400
                                                    group-has-[input:checked]:opacity-50
                                                    ${showFullTask.id === task.id ? !showFullTask.display ? "line-clamp-1 break-all" : "break-all" : "line-clamp-1 break-all"}
                                                        `}
                        >
                          {checkLinkExist(task.task)
                            ? hyperlinkDecorator(task.task)
                            : task.task}
                          {/* {task.task} */}
                        </li>
                      ) : (
                        <UpdateTaskForm id={task.id} title={task.task} />
                      )}
                      <div className="absolute  -top-2 left-1 flex gap-2">

                        <span
                          className={`text-xs  text-[#2B2A2A] 
                      md:bg-transparent md:text-slate-400 group-hover:text-[#2B2A2A] px-1 
                       ${!task.completed
                              ? "bg-yellow-400 shadow-yellow md:shadow-none  md:group-hover:shadow-yellow md:group-hover:bg-yellow-400"
                              : "bg-green-400 shadow-green md:shadow-none  md:group-hover:shadow-green md:group-hover:bg-green-400"
                            } 
                       font-semibold rounded-full  w-fit text-center `}>
                          {new Date(`${task.updatedat}`).toLocaleString("en-US", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </span>
                        {
                          window.innerWidth > 400 && task.task.length > 40 &&

                          <span
                            className="text-xs bg-purple-500  text-slate-200  px-2
                          font-semibold rounded-full  w-fit text-center cursor-pointer uppercase shadow-purple"
                            onClick={() => {

                              setShowFullTask({ id: task.id, display: showFullTask.id === task.id ? !showFullTask.display : true })


                            }}
                          >{showFullTask.id === task.id ? showFullTask.display ? "Clamp" : "Full" : "Full"}</span>
                        }
                        {

                          window.innerWidth < 400 &&

                          task.task.length > 35 &&
                          <span
                            className="text-xs bg-purple-500  text-slate-200  px-2
                          font-semibold rounded-full  w-fit text-center cursor-pointer uppercase shadow-purple"
                            onClick={() => {


                              setShowFullTask({ id: task.id, display: showFullTask.id === task.id ? !showFullTask.display : true })

                            }}
                          >{showFullTask.id === task.id ? showFullTask.display ? "Clamp" : "Full" : "Full"}</span>
                        }

                      </div>
                    </div>
                    <div className="flex gap-2">
                      {checkLinkExist(task.task) && (
                        <a
                          href={`${getHyperLink(task.task)}`}
                          title="Go to first address"
                          className=" rounded  font-semibold cursor-pointer hover:bg-blue-600/30 hover:shadow p-1 "
                          target="_blank">
                          <i className="fa-solid fa-up-right-from-square text-blue-400"></i>
                        </a>
                      )}
                      <button
                        title="copy to clipboard"
                        onClick={() => {
                          clipboard.write(task.task);
                          setClipboardStatus({ id: task.id, type: "fa-check" });
                          setTimeout(
                            () =>
                              setClipboardStatus({
                                id: task.id,
                                type: "fa-copy",
                              }),
                            1500,
                          );
                        }}
                        className={` rounded  font-semibold cursor-pointer  ${!task.completed ? "hover:bg-yellow-600/30" : "hover:bg-green-600/30"} hover:shadow p-1 `}>
                        <i
                          className={`fa-solid ${task.id === clipboardStatus.id ? clipboardStatus.type : "fa-copy"} ${!task.completed ? "text-yellow-400" : "text-green-400"}`}></i>
                      </button>
                      <button
                        onClick={() =>
                          setAskBeforeDel({ id: task.id, display: true })
                        }
                        className=" rounded  font-semibold cursor-pointer hover:bg-red-600/30 hover:shadow p-1 ">
                        <i className="fa-solid fa-trash text-red-500 "></i>
                      </button>
                      {task.id === askBeforeDel.id && askBeforeDel.display && (
                        <span className="absolute font-semibold dark-bg rounded  -right-7.5 md:-right-12 -top-3 text-xs p-1 backdrop-blur-3xl">
                          Are you sure?
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                dispatch(removeTask(task.id));
                                dispatch(deleteTask(task.id));
                              }}
                              className="transition-all cursor-pointer bg-gray-600 hover:gray-bg p-1 rounded hover:outline-green-400 hover:outline">
                              Yes
                            </button>
                            <button
                              onClick={() =>
                                setAskBeforeDel({ id: null, display: false })
                              }
                              className="transition-all cursor-pointer bg-gray-600 hover:gray-bg p-1 rounded hover:outline-green-400 hover:outline">
                              No
                            </button>
                          </div>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <h2 className="text-5xl text-slate-300 mt-2 p-4 text-center ">
                <img src={gokuSleep} alt="" className="w-2/5 inline-block" />
              </h2>
            )}
          </ul>
        </div>
      </div >
    </div >
  );
}
