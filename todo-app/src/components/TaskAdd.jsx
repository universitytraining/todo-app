import { useState } from "react";

export default function TaskAdd({ onTaskAdd }) {
    // const addTask = () => {
        // setTasks((oldTasks) => [...oldTasks, { id: uuid(), title: "placeholderTask" }]);
    // };
    const [taskText, setTaskText] = useState('');
    const addTaskHandle = () => {
        onTaskAdd(taskText);
    }
    return (
        <>
            {/* <ul>
                {tasks.map((t) => (
                    <li key={t.id}>{t.title}</li>
                ))}
            </ul>
            <button onClick={addTask}>Add New Task</button> */}
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Enter task..."
            />
            <button onClick={addTaskHandle}>Add Task</button>
        </>
    );
}