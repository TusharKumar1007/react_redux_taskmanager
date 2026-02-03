import { useSelector, useDispatch } from "react-redux";
import { removeTask, toggleEditMode, updateDoneTask } from "./taskSlice";
import { AddTempTaskForm } from "../layout/addTempTaskForm";
import { UpdateTaskForm } from "../layout/updateTaskForm";
import gokuRunningLoder from '/goku running.gif'
import clipboard from 'clipboardy';
import { useState } from "react";
import { checkLinkExist, getHyperLink } from "../utils/gethyperlink";

export default function TempTask() {

    let curTasks = useSelector((state) => state.tasks.tasks);
    const disable = useSelector((state) => state.tasks.disable)
    const [clipboardStatus, setClipboardStatus] = useState({ id: null, type: 'fa-copy' })
    const [askBeforeDel, setAskBeforeDel] = useState({ id: null, display: false })
    const [showFullTask, setShowFullTask] = useState({ id: null, display: false })


    const dispatch = useDispatch();


    let reversedTasks = [...curTasks].reverse()

    return (
        <div className="flex justify-center items-center mt-20">

            <div className="w-full flex flex-col gap-2 items-center justify-center shadow-2xs sm:w-3/5 lg:w-1/2 ">

                <AddTempTaskForm />
                <div className="p-4 bg-stone-700/50 backdrop-blur-3xl text-slate-200 transition-all rounded w-full shadow-2xl">
                    {/* <Header /> */}

                    <ul className="mt-4">
                        {reversedTasks.length > 0 ?
                            reversedTasks.map((task) => {

                                return (
                                    <div
                                        key={task.id}
                                        className={`flex gap-2 justify-between mt-3 px-4 items-center py-3 md:py-2 transition-all hover:bg-gray-500/20 hover:shadow rounded  relative group `}>
                                        <div className="flex gap-4 justify-start items-center min-w-0 flex-1 overflow-hidden">
                                            <input
                                                className="peer rounded-xs cursor-pointer accent-green-400 shrink-0"
                                                type="checkbox"
                                                onChange={(e) => {

                                                    dispatch(updateDoneTask({ id: task.id, isDone: e.target.checked }))

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
                                                    className={`text-xs sm:text-xl cursor-pointer peer-checked:line-through
                                                    decoration-green-400
                                                    group-has-[input:checked]:opacity-50
                                                    ${showFullTask.id === task.id ? !showFullTask.display ? "line-clamp-1 break-all" : "break-all" : "line-clamp-1 break-word"}
                                                        `}>
                                                    {task.task}
                                                </li>
                                            ) : (
                                                <UpdateTaskForm id={task.id} title={task.task} />
                                            )}
                                            <div className="absolute -top-2 left-1 flex gap-2">

                                                <span className={`text-xs  text-[#2B2A2A] md:bg-transparent md:text-slate-400  group-hover:text-[#2B2A2A] px-1
                                            ${!task.completed ? "bg-teal-400 shadow-teal md:shadow-none  md:group-hover:shadow-teal md:group-hover:bg-teal-400" :
                                                        "bg-green-400 shadow-green md:shadow-none  md:group-hover:shadow-green md:group-hover:bg-green-400"
                                                    } 
                                             font-semibold rounded-full  w-fit text-center`}>TEMP {new Date(`${task.updatedat}`)
                                                        .toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</span>
                                                {
                                                    task.task.length > 40 &&
                                                    <span
                                                        className="text-xs bg-purple-500  text-slate-200   px-2
                                                font-semibold rounded-full w-fit text-center cursor-pointer uppercase shadow-purple"
                                                        onClick={() => {

                                                            setShowFullTask({ id: task.id, display: showFullTask.id === task.id ? !showFullTask.display : true })


                                                        }}
                                                    >{showFullTask.id === task.id ? showFullTask.display ? "Clamp" : "Full" : "Full"}</span>
                                                }
                                            </div>
                                        </div>
                                        <div className="flex gap-2">

                                            {checkLinkExist(task.task) && <a
                                                href={`${getHyperLink(task.task)}`}
                                                title="Go to address"
                                                className=" rounded  font-semibold cursor-pointer hover:bg-blue-600/30 p-1 "
                                                target="_blank"
                                            >
                                                <i className="fa-solid fa-up-right-from-square text-blue-400"></i>
                                            </a>}
                                            <button
                                                title="copy to clipboard"
                                                onClick={() => {
                                                    clipboard.write(task.task)
                                                    setClipboardStatus({ id: task.id, type: "fa-check" })
                                                    setTimeout(() => setClipboardStatus({ id: task.id, type: "fa-copy" }), 1500)

                                                }}
                                                className=" rounded  font-semibold cursor-pointer hover:bg-teal-600/30 p-1 ">
                                                <i className={`fa-solid ${task.id === clipboardStatus.id ? clipboardStatus.type : "fa-copy"} ${!task.completed ? "text-teal-400" : "text-green-400"}`}></i>

                                            </button>
                                            <button
                                                onClick={() => setAskBeforeDel({ id: task.id, display: true })}
                                                className=" rounded  font-semibold cursor-pointer hover:bg-red-600/30 p-1 ">
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
                            }) : <h2 className={`text-2xl md:text-4xl  mt-2 p-4 flex justify-center items-center ${disable && "bg-mountain"}`}>{disable ?
                                // <i className="fa-solid fa-spinner animate-spin text-yellow-400 block" ></i> 
                                <img src={gokuRunningLoder} alt="" width={60} />
                                : `These tasks will be temperory, Login or Register to use across devices...`}</h2>}
                    </ul>
                </div>
            </div>
        </div>
    );
}
