import { useState } from "react";


export default function TaskAdd({ onTaskAdd }) {
    const [taskText, setTaskText] = useState('');
    const addTaskHandle = () => {
        onTaskAdd(taskText);
    }
    return (
        <>
            <input
                type="text"
                value={taskText}
                onChange={(t) => setTaskText(t.target.value)}
                placeholder="Enter task..."
            />
            <button onClick={addTaskHandle}>Add Task</button>
        </>
    );
}