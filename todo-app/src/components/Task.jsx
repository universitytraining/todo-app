export default function Task({ task }) {
    // const liStyles = { 
    // color: task.completed ? "green" : "red", 
    // fontSize: task.completed ? "1rem" : "1.2rem" 
    // }
    
    return (
        <li>
            {task.text}
        </li>
    )
}