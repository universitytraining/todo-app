import Task from "./Task"

export default function TaskList({ tasks }) {
    return (
            <ul>
                {tasks.map((task) => ( 
                    <Task key={task.id} taskObj={task}/>
                ))}
            </ul>
    );
};

