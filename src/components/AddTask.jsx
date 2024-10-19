import React from "react";

// * hooks
import { useState } from "react";

const AddTask = ({ taskList, setTaskList }) => {
    const [addModal, setAddModal] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleInput = (e) => {
        // const name = e.target.name;
        // const value = e.target.value;
        // ! or
        const { name, value } = e.target;

        if (name == "projectName") {
            setProjectName(value);
            setErrorMsg("");
        }
        if (name == "taskDesc") setTaskDesc(value);

        if (name == "projectName" && value == "") {
            setErrorMsg("enter a valid project name ");
        }
    };

    const handleAdd = (e) => {
        const timeStamp = new Date();

        let tempTaskList = taskList;
        tempTaskList.push({
            projectName,
            taskDesc,
            timeStamp,
            duration: 0,
        });

        localStorage.setItem("taskList", JSON.stringify(tempTaskList))
        window.location.reload()

        if (!projectName) {
            // ! if user has not wrote project name
            setErrorMsg("enter a valid project name ");
        } else {
            e.preventDefault();
            setTaskList([...taskList, { projectName, taskDesc, timeStamp }]);
        }
    };

    return (
        <>
            <button
                type="button"
                className="text-xs uppercase text-white font-semibold px-2 pl-2 py-1 pr-2.5 mx-1.5 rounded cursor-pointer bg-blue-500 hover:opacity-75 transition-all"
                onClick={() => {
                    setAddModal(true);
                }}
            >
                + New
            </button>
            {/* ! conditional randoring */}
            {addModal ? (
                <>
                    <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
                        <div className="max-w-lg bg-white rounded w-9/12 p-5 border relative flex flex-col gap-5">
                            <div className="flex justify-between border-b border-b-gray-300 pb-3">
                                <h3 className="text-3xl font-semibold  ">
                                    Add new task{" "}
                                </h3>
                                <button
                                    onClick={() => {
                                        setAddModal(false);
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
                                    <p className="text-red-500 capitalize text-sm ">
                                        {errorMsg}
                                    </p>
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
                                    onClick={handleAdd}
                                    className="outline-none focus:opacity-75 uppercase text-white font-semibold text-xs px-2 pl-2 py-1 pr-2.5 rounded cursor-pointer bg-blue-500 hover:opacity-75 transition-all"
                                >
                                    Add Task{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default AddTask;
