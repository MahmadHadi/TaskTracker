// * hooks
import { useEffect, useState } from "react";

// * components
import AddTask from "./components/AddTask";
import Todo from "./components/Todo";

// * css
import "./App.css";
import { useDrop } from "react-dnd";

function App() {
    const [taskList, setTaskList] = useState([]);
    console.log(taskList);

    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        let array = localStorage.getItem("taskList");

        if (array) {
            setTaskList(JSON.parse(array));
        }
    }, []);

    // ! drop
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "todo",
        drop: (item) =>
            addToCompleted(
                item.id,
                item.projectName,
                item.taskDesc,
                item.timeStamp,
                item.duration
            ),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addToCompleted = (id, projectName, taskDesc, timeStamp, duration) => {
        const moveTask = taskList.filter((task) => id === task.id);
        setCompleted((completed) => [
            ...completed,
            { moveTask, projectName, taskDesc, timeStamp, duration },
        ]);
    };

    return (
        <>
            <h1 className="text-3xl font-bold py-4 pl-3">3 - TaskTracker </h1>
            <p className="text-xl pl-3">Hi There!</p>
            <div className="flex items-center">
                <p className="text-xl pl-3">Click</p>
                <AddTask taskList={taskList} setTaskList={setTaskList} />
                <p className="text-xl">to add a new task</p>
            </div>
            <div>
                <div className="grid grid-cols-3">
                    {taskList.map((task, i) => {
                        console.log("task", task);
                        return (
                            <Todo
                                // key={new Date().getTime()}
                                key={i}
                                task={task}
                                index={i}
                                taskList={taskList}
                                setTaskList={setTaskList}
                            />
                        );
                    })}
                </div>

                <div className="border border-black min-h-9" ref={drop}>
                    <h2 className="ml-6 text-xl font-semibold max-w-lg my-4 py-2 px-4 bg-gray-200">
                        Completed :{" "}
                    </h2>
                    <div className="grid grid-cols-3">
                        {completed.map((task, i) => {
                            console.log("task", task);
                            return (
                                <Todo
                                    // key={new Date().getTime()}
                                    key={i}
                                    task={task}
                                    index={i}
                                    taskList={taskList}
                                    setTaskList={setTaskList}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
