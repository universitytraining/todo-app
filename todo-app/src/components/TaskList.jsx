import Task from "./Task"

export default function TaskList({ tasks, deleteTask }) {
    return (
        <ul>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                />
            ))}
        </ul>
    );
};

