import React from "react";
import PropTypes from "prop-types";

export default function Task({task: {id, title, state}, onArchiveTask, onPinTask}) {
    return (
        <div className={`list-item ${state}`}>
            <label
                htmlFor="title"
                aria-label={`archiveTask-${id}`}
                className="checkbox">
                <input
                    type="checkbox"
                    disabled={true}
                    id={`archiveTask-${id}`}
                    checked={state === "TASK_ARCHIVED"}
                    name="checked"/>
                <span
                    className="checkbox-custom"
                    onClick={() => onArchiveTask(id)}/>
            </label>

            <label
                htmlFor="title"
                aria-label={title}
                className="title">
                <input
                    type="text"
                    value={title}
                    readOnly={true}
                    name="title"
                    placeholder="Input Title"
                    style={{background: "red"}}/>
            </label>

            {state !== "TASK_ARCHIVED" && (
                <button
                    className="pin-button"
                    onClick={() => onPinTask(id)}
                    id={`pinTask-${id}`}
                    aria-label={`pinTask-${id}`}
                    key={`pinTask-${id}`}>
                    <span className="icon-star"/>
                </button>
            )}
        </div>
    );
}

Task.propTypes = {
    /** Composition of the Task */
    task: PropTypes.shape({
        /** Id of the Task */
        id: PropTypes.string.isRequired,
        /** Title of the Task */
        title: PropTypes.string.isRequired,
        /** Current State of the Task */
        state: PropTypes.string.isRequired
    }),
    /** Event to change the Task to Archived */
    onArchiveTask: PropTypes.func,
    /** Event to change the Task to Pinned */
    onPinTask: PropTypes.func
}