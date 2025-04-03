import './styles/App.css'
import { useState } from 'react';
import { v4 as uuid } from "uuid";
import TaskAdd from './components/TaskAdd';
import TaskList from './components/TaskList';


export default function App() {
    const [tasks, setTasks] = useState([
        { id: uuid(), text: "task.text ? add : don't " },
        { id: uuid(), text: "CompletedToggle" },
        { id: uuid(), text: "Open up DB Server" }
    ]);

    const addTaskHandle = (text) => {
        setTasks([
            ...tasks,
            {
                id: uuid(),
                text: text
            }
        ]);
    };


    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    return (
        <>
            <TaskAdd onTaskAdd={addTaskHandle} />
            <TaskList tasks={tasks} deleteTask={deleteTask} />
        </>
    )
}
