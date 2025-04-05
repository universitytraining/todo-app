import Task from "./Task"

export default function TaskList({ tasks, deleteTask }) {
    return (
        <>
        <h2>My tasks:</h2>
            <ul>
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                    />
                ))}
            </ul>
        </>
    );
};

