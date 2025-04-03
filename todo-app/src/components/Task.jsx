export default function Task({ task, deleteTask }) {

    return (
        <li>
            {task.text} 
            &nbsp;
            <button onClick={() => deleteTask(task.id)}>Delete</button>

        </li>
    )
}