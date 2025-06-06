import { getFirestore, collection, addDoc, getDocs, query, where, Timestamp } from "firebase/firestore";
import { auth } from "./firebase";

const db = getFirestore();

export async function addJournal({ title, location, description, startDate, endDate, imageSections }: {title : string , location: string, description: string; startDate: string; endDate: string; imageSections?: { urls: string[]; description: string }[] }) {
  if (!auth.currentUser) throw new Error("Not authenticated");
  return await addDoc(collection(db, "journals"), {
    title,
    location,
    userId: auth.currentUser.uid,
    description,
    startDate: Timestamp.fromDate(new Date(startDate)),
    endDate: Timestamp.fromDate(new Date(endDate)),
    imageSections: imageSections || [],
    createdAt: Timestamp.now(),
  });
}

export async function getUserJournals(userId: string) {
  const q = query(collection(db, "journals"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
