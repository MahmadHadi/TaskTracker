import React, { useEffect } from "react";
import { useState } from "react";

function EditTask({ key, task, taskList, setTaskList }) {
    const [editModal, setEditModal] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    useEffect(() => {
        setProjectName(task.projectName);
        setTaskDesc(task.taskDesc);
    }, []);

    const handleInput = (e) => {
        // const name = e.target.name;
        // const value = e.target.value;
        // ! or
        const { name, value } = e.target;

        if (name == "projectName") setProjectName(value);
        if (name == "taskDesc") setTaskDesc(value);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        let taskIndex = taskList.indexOf(task);
        taskList.splice(taskIndex, 1, {
            projectName,
            taskDesc,
            timeStamp: task.timeStamp,
            duration: task.duration,
        });
        localStorage.setItem("taskList", JSON.stringify(taskList));
        window.location.reload();
        setEditModal(false);
    };
    return (
        <div>
            <button
                onClick={() => {
                    setEditModal(true);
                }}
                className="bg-gray-500 text-white font-semibold py-0.5 px-3 rounded-sm"
            >
                Edit{" "}
            </button>
            {editModal ? (
                <>
                    <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
                        <div className="max-w-lg bg-white rounded w-9/12 p-5 border relative flex flex-col gap-5">
                            <div className="flex justify-between border-b border-b-gray-300 pb-3">
                                <h3 className="text-3xl font-semibold  ">
                                    Edit task{" "}
                                </h3>
                                <button
                                    onClick={() => {
                                        setEditModal(false);
                                    }}
                                    className="px-1 text-gray-400 text-3xl leading-none font-semibold block"
                                >
                                    X
                                </button>
                            </div>

                            <form className="flex flex-col gap-3">
                                <div>
                                    <label
                                        htmlFor="project-name"
                                        className="tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                                    >
                                        Project Name
                                    </label>
                                    <input
                                        name="projectName"
                                        value={projectName}
                                        onChange={handleInput}
                                        type="text"
                                        id="project-name"
                                        placeholder="Project Name "
                                        autoFocus
                                        required
                                        className="border border-gray-200 bg-gray-100 px-2 py-1 rounded-sm outline-none w-full focus:bg-white transition-all"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="task-description"
                                        className="tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                                    >
                                        Task Description
                                    </label>
                                    <textarea
                                        name="taskDesc"
                                        value={taskDesc}
                                        onChange={handleInput}
                                        id="task-description"
                                        rows={5}
                                        placeholder="Task Description"
                                        className="border border-gray-200 bg-gray-100 px-2 py-1 rounded-sm outline-none w-full focus:bg-white transition-all"
                                    />
                                </div>
                            </form>
                            <div className="flex justify-end border-t border-t-gray-300 pt-3">
                                <button
                                    onClick={handleUpdate}
                                    className="outline-none focus:opacity-75 uppercase text-white font-semibold text-xs px-2 pl-2 py-1 pr-2.5 rounded cursor-pointer bg-blue-500 hover:opacity-75 transition-all"
                                >
                                    Update Task{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default EditTask;
