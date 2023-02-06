import { db } from "./firebase-config";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export async function getStudentDB(user) {
  const docRef = doc(db, "students", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export function isTaskCompletedDB(student, task) {
  if (student.taskSubmissions === undefined) return false;
  let isCompleted = student.taskSubmissions.find((taskSubmission) => {
    return taskSubmission.taskId === task.id;
  });
  return isCompleted !== null && isCompleted !== undefined;
}

export async function submitTask(user, task, submissionLink, callback) {
  const studentRef = doc(db, "students", user.uid);
  await updateDoc(studentRef, {
    taskSubmissions: arrayUnion({
      taskId: task.id,
      submission: submissionLink,
    }),
  });
  callback();
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
