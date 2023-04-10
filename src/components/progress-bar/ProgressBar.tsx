import './ProgressBar.css'

export default function ProgressBar() {
    return <div className="progress-bar-container">
        <div className="completed-bar" style={{width: "50%"}} />
        <div className="onhold-bar" style={{width: "25%"}}  />
        <div className="todo-bar" style={{width: "25%"}}  />
    </div>
}