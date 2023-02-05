import { auth, db } from "./firebase-config";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  collection,
} from "firebase/firestore";

export function getTaskDB(task_id) {}
export function getCompanyDB(user) {}
export async function getStudentDB(user) {
  const docRef = doc(db, "students", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}
export function isCompanyDB(user) {}

export function isTaskCompletedDB(student, task) {
  let isCompleted = student.completedTasks.find((completedTaskId) => {
    return completedTaskId === task.id;
  });
  return isCompleted ? "Completed" : "Incomplete";
}

export function addCompanyDB(user, companyName) {
  setDoc(doc(db, "companies", user.uid), {
    uid: user.uid,
    email: user.email,
    companyName: companyName,
  });
}

export function addStudentDB(user) {
  setDoc(doc(db, "students", user.uid), {
    uid: user.uid,
    email: user.email,
    completedTasks: [],
  });
}

export async function getTasksDB() {
  const q = query(collection(db, "tasks"));
  const querySnapshot = await getDocs(q);
  let tasks = [];
  querySnapshot.forEach((doc) => {
    let d = doc.data();
    tasks.push({ id: doc.id, ...d });
  });
  return tasks;
}
