import React from "react";

function DeleteTask({ key, task, index, taskList, setTaskList }) {
    const handleDelete = (itemID) => {
        // const taskIndex = taskList.indexOf(task);
        // taskList.splice(taskIndex, 1);
        // task.index = taskIndex
        // console.log("taskList", taskList, " index ", taskIndex)

        const removeIndex = taskList.indexOf(task);
        taskList.splice(removeIndex, 1);
        
        localStorage.setItem("taskList", JSON.stringify(taskList));
        window.location.reload();

        // setTaskList((currentTask) =>
        //     currentTask.filter((todo) => todo.id !== itemID)
        // );
    };
    return (
        <div>
            <button
                onClick={handleDelete}
                className="uppercase w-full font-semibold py-1 px-3 rounded-sm bg-red-400"
            >
                delete
            </button>
        </div>
    );
}

export default DeleteTask;
