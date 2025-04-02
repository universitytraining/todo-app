import './styles/App.css'
import { useState } from 'react';
import { v4 as uuid } from "uuid";
import TaskAdd from './components/TaskAdd';
import TaskList from './components/TaskList';


export default function App() {
const [tasks, setTasks] = useState([
    {id: uuid(), text: "task.text ? add : don't "},
    {id: uuid(), text: "DeleteBtn"},
    {id: uuid(), text: "CompletedToggle"},
    {id: uuid(), text: "Open up DB Server"}
]);

const addTaskHandle = (text) => {
    setTasks([
        ...tasks,
        {id: uuid(), text: text }
    ]);
};

    return (
        <>
            <TaskList tasks={tasks} />
            <TaskAdd onTaskAdd={addTaskHandle}/>
        </>
    )
}
