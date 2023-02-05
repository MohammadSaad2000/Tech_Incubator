import SignOut from "./SignOut";
import TaskTable from "./TaskTable";
import { db } from "../../firebase-config";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
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
  let taskTable = null;

  useEffect(() => {
    if (user === null) {
      return;
    }
    async function updateTasks() {
      let tasksRes = await getTasksDB();
      let student = await getStudentDB(user);
      tasksRes.forEach((t) => {
        t.status = isTaskCompletedDB(student, t);
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
          />
        )}
        <SignOut user={user} logout={logout} />
      </div>
    </div>
  );
};

export default StudentDashboard;
