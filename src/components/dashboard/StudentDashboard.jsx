import SignOut from "./SignOut";
import TaskTable from "./TaskTable";
import TaskPopup from "./TaskPopup";
import { useState, useEffect } from "react";
import {
  getTasksDB,
  isTaskCompletedDB,
  getStudentDB,
} from "../../firestore-utilities";

const columns = [
  { label: "Task", accessor: "taskName", sortable: true },
  { label: "Company", accessor: "companyName", sortable: true },
  { label: "Description", accessor: "description", sortable: false },
  { label: "Date Assigned", accessor: "dateAssigned", sortable: true },
  { label: "Date Due", accessor: "dateDue", sortable: true },
  { label: "Status", accessor: "status", sortable: true },
];

const StudentDashboard = ({ user, logout }) => {
  const [tasks, setTasks] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (user === null) {
      return;
    }
    async function updateTasks() {
      let tasksRes = await getTasksDB();
      let student = await getStudentDB(user);
      tasksRes.forEach((t) => {
        let isTaskCompleted = isTaskCompletedDB(student, t);
        t.status = isTaskCompleted ? "Completed" : "Incomplete";
      });
      setTasks(tasksRes);
    }
    updateTasks();
  }, [user]);

  return (
    <div>
      <div>
        {tasks != null && (
          <TaskTable
            caption="Tasks Currently Available"
            data={tasks}
            columns={columns}
            setIsPopupOpen={setIsPopupOpen}
            setSelectedTask={setSelectedTask}
          />
        )}
        {isPopupOpen && (
          <TaskPopup {...{ user, selectedTask, setIsPopupOpen }} />
        )}
        <SignOut user={user} logout={logout} />
      </div>
    </div>
  );
};

export default StudentDashboard;
