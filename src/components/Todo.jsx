import React, { useEffect } from "react";
import { useState } from "react";

import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { useDrag } from "react-dnd";

function Todo({ key, task, index, taskList, setTaskList }) {
    // console.log(key)
    const [time, setTime] = useState(task.duration);
    const [running, setRunning] = useState(false);
    // ! drag and drop
    const [{ isDragging }, drag] = useDrag(() => {
        return {
            type: "todo",
            item: {
                id: index,
                projectName: task.projectName,
                taskDesc: task.taskDesc,
                timeStamp: task.timeStamp,
                duration: task.duration,
            },
            collect: (monitor) => {
                return {
                    isDragging: !!monitor.isDragging(),
                };
            },
        };
    });

    // * running the watch
    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [running]);

    const handleStop = () => {
        setRunning(false);

        let taskIndex = taskList.indexOf(task);
        taskList.splice(taskIndex, 1, {
            projectName: task.projectName,
            taskDesc: task.taskDesc,
            timeStamp: task.timeStamp,
            duration: time,
        });

        localStorage.setItem(taskList.JSON.stringfy(taskList));
        window.location.reload();
    };
    return (
        <div ref={drag} className="bg-white m-2 p-3 rounded-md shadow-md ">
            <div className="flex items-center justify-between">
                <p className="font-semibold tracking-wider capitalize text-2xl">
                    {task.projectName}
                </p>
                <EditTask
                    key={index}
                    task={task}
                    index={index}
                    taskList={taskList}
                    setTaskList={setTaskList}
                />
            </div>

            <div className="border-b border-b-gray-300 w-full my-2"></div>

            <p>{task.taskDesc}</p>

            <div className="my-2 md:flex-row flex-col flex items-center justify-evenly">
                <div>
                    <span>
                        {("0" + Math.floor((time / 3600000) % 24)).slice(-2)} :
                    </span>
                    <span>
                        {("0" + Math.floor((time / 60000) % 60)).slice(-2)} :{" "}
                    </span>
                    <span>
                        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}{" "}
                    </span>
                    <span className="text-sm">
                        : {("0" + ((time / 10) % 100)).slice(-2)}{" "}
                    </span>
                </div>
                <div className="my-2 ">
                    {running ? (
                        <button
                            onClick={handleStop}
                            className="border rounded-md py-1 px-3 "
                        >
                            Stop
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setRunning(true);
                            }}
                            className="border rounded-md py-1 px-3 "
                        >
                            Start
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setTime(0);
                            setRunning(false);
                        }}
                        className="border rounded-md py-1 px-3 mx-2"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="text-center my-4">
                <DeleteTask
                    key={index}
                    task={task}
                    index={index}
                    taskList={taskList}
                    setTaskList={setTaskList}
                />
            </div>
        </div>
    );
}

export default Todo;
