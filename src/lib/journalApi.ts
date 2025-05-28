import { getFirestore, collection, addDoc, getDocs, query, where, Timestamp } from "firebase/firestore";
import { auth } from "./firebase";

const db = getFirestore();

export async function addJournal({ description, startDate, endDate, imageUrls }: { description: string; startDate: string; endDate: string; imageUrls?: string[] }) {
  if (!auth.currentUser) throw new Error("Not authenticated");
  return await addDoc(collection(db, "journals"), {
    userId: auth.currentUser.uid,
    description,
    startDate: Timestamp.fromDate(new Date(startDate)),
    endDate: Timestamp.fromDate(new Date(endDate)),
    imageUrls: imageUrls || [],
    createdAt: Timestamp.now(),
  });
}

export async function getUserJournals(userId: string) {
  const q = query(collection(db, "journals"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
