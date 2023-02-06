import React from "react";
import { submitTask } from "../../firestore-utilities";

const TaskPopup = ({ user, selectedTask, setIsPopupOpen }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    let submission = event.target.submission.value;
    if (!event.target.checkValidity()) {
      return;
    }
    setIsPopupOpen(false);
    submitTask(user, selectedTask, submission);
    window.location.reload();
  };

  function getFormattedDate(timeStamp) {
    let date = new Date(timeStamp.seconds * 1000);
    return (
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      "/" +
      date.getFullYear()
    );
  }

  return (
    <div className="popup-box">
      <div className="box">
        <span
          className="close-icon"
          onClick={() => {
            setIsPopupOpen(false);
          }}
        >
          x
        </span>
        <h2>{selectedTask.taskName}</h2>
        <p>
          <b>Assigned by: </b>
          {selectedTask.companyName}
        </p>
        <p>
          <b>Description: </b>
          {selectedTask.description}
        </p>
        <p>
          <b>Date Assigned: </b>
          {getFormattedDate(selectedTask.dateAssigned)}
        </p>
        <p>
          <b>Date Due: </b>
          {getFormattedDate(selectedTask.dateDue)}
        </p>

        {selectedTask.status !== "Completed" && (
          <form onSubmit={handleSubmit}>
            <input
              type="url"
              id="submission"
              name="submission"
              placeholder="Submission Link"
            />
            <button type="submit">Submit</button>
          </form>
        )}

        {selectedTask.status === "Completed" && <h4>Submitted</h4>}
      </div>
    </div>
  );
};

export default TaskPopup;
