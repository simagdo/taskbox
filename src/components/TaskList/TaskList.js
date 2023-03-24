import Task from "../Task/Task";
import {useDispatch, useSelector} from "react-redux";
import {updateTaskState} from "../../lib/store";

export default function TaskList(/*{loading, tasks, onPinTask, onArchiveTask}*/) {

    const tasks = useSelector((state) => {
        const tasksInOrder = [
            ...state.taskbox.tasks.filter((task) => task.state === "TASK_PINNED"),
            ...state.taskbox.tasks.filter((task) => task.state !== "TASK_PINNED")
        ];

        return tasksInOrder.filter((task) => task.state === "TASK_INBOX" || task.state === "TASK_PINNED");
    });

    const {status} = useSelector((state) => state.taskbox);
    const dispatch = useDispatch();

    const pinTask = (value) => {
        dispatch(updateTaskState({id: value, newTaskState: "TASK_PINNED"}));
    }

    const archiveTask = (value) => {
        dispatch(updateTaskState({id: value, newTaskState: "TASK_ARCHIVED"}));
    }

    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox"/>
            <span className="glow-text">
                <span>Loading</span><span>cool</span><span>state</span>
            </span>
        </div>
    )

    if (status === "loading") {
        return (
            <div className="list-items" data-testid="loading" key={"loading"}>
                {[...Array(6)].map(() => (
                    LoadingRow
                ))}
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="list-items" key="empty" data-testid="empty">
                <div className="wrapper-message">
                    <span className="icon-check"/>
                    <p className="title-message">You have no Tasks</p>
                    <p className="subtitle-message">Sit back and Relax</p>
                </div>
            </div>
        )
    }

    return (
        <div className="list-items">
            {tasks.map(task => (
                <Task
                    key={task.id}
                    task={task}
                    onPinTask={(task) => pinTask(task)}
                    onArchiveTask={(task) => archiveTask(task)}/>
            ))}
        </div>
    );
}