import { useSelector, useDispatch } from "react-redux";
import { removeTask, toggleEditMode, updateDoneTask } from "./taskSlice";
import { AddTempTaskForm } from "../layout/addTempTaskForm";
import { UpdateTaskForm } from "../layout/updateTaskForm";



export default function TempTask() {

    let curTasks = useSelector((state) => state.tasks.tasks);
    const disable = useSelector((state) => state.tasks.disable)
    const dispatch = useDispatch();


    let reversedTasks = [...curTasks].reverse()

    return (
        <div className="flex justify-center items-center">

            <div className="w-full flex flex-col gap-2 items-center justify-center shadow-2xs sm:w-3/5 lg:w-1/2 ">

                <AddTempTaskForm />
                <div className="p-4 bg-stone-700 text-slate-200 transition-all rounded w-full shadow-2xl">
                    {/* <Header /> */}

                    <ul className="mt-4">
                        {reversedTasks.length > 0 ?
                            reversedTasks.map((task) => {

                                return (
                                    <div
                                        key={task.id}
                                        className={`flex gap-2 justify-between mt-2 px-4 items-center py-2 transition-all hover:bg-[#484545] rounded  relative group  ${task.completed && "opacity-50 hover:opacity-100"}`}>
                                        <div className="flex gap-4 justify-center items-center">
                                            <input
                                                className=" rounded-xs cursor-pointer"
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
                                                    className={` text-xs sm:text-xl capitalize cursor-pointer ${task.completed && "line-through"
                                                        }`}>
                                                    {task.task}
                                                </li>
                                            ) : (
                                                <UpdateTaskForm id={task.id} title={task.task} />
                                            )}
                                            <span className="text-xs bg-teal-400 text-[#2B2A2A] md:bg-transparent md:text-slate-500 absolute group-hover:text-[#2B2A2A] px-1 md:group-hover:bg-teal-400 font-semibold rounded-full -top-2 left-1 w-38 text-center">TEMP {new Date(`${task.updatedat}`)
                                                .toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                dispatch(removeTask(task.id))

                                            }}
                                            className=" rounded  font-semibold cursor-pointer text-red-500 ">
                                            <i className="fa-solid fa-trash"></i>

                                        </button>
                                    </div>
                                );
                            }) : <h2 className="text-4xl  mt-2 p-4 flex justify-center items-center ">{disable ? <i className="fa-solid fa-spinner animate-spin text-yellow-400 block" ></i> : "These tasks will be temperory, Login or Register to use across devices..."}</h2>}
                    </ul>
                </div>
            </div>
        </div>
    );
}
