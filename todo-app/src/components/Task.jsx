export default function Task({ taskObj }) {
    const liStyles = { color: taskObj.completed ? "green" : "red", fontSize: taskObj.completed ? "1rem" : "2rem" }
    return (
        <li style={liStyles}>
            {taskObj.task} - {taskObj.id}
        </li>
    )
}