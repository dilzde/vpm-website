import {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  Timestamp,
  serverTimestamp,
  QueryConstraint,
  DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

/* ── Collection references ──────────────────────────────────────── */
export const announcementsRef = collection(db, "announcements");
export const carouselSlidesRef = collection(db, "carouselSlides");
export const branchesRef = collection(db, "branches");
export const eventsRef = collection(db, "events");
export const siteImagesRef = collection(db, "siteImages");
export const prayerRequestsRef = collection(db, "prayerRequests");
export const livestreamConfigRef = doc(db, "config", "livestream");

/* ── Typed helpers ──────────────────────────────────────────────── */

export async function getActiveAnnouncements() {
  const q = query(
    announcementsRef,
    where("active", "==", true),
    orderBy("order", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getActiveCarouselSlides(slot: "support" | "booking") {
  const q = query(
    carouselSlidesRef,
    where("slot", "==", slot),
    where("active", "==", true),
    orderBy("order", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getActiveBranches() {
  const q = query(
    branchesRef,
    where("active", "==", true),
    orderBy("order", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getUpcomingEvents(max = 5) {
  const q = query(
    eventsRef,
    where("date", ">", Timestamp.now()),
    orderBy("date", "asc"),
    limit(max)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getAllEvents() {
  const q = query(eventsRef, orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getLivestreamConfig() {
  const snap = await getDoc(livestreamConfigRef);
  return snap.data() || {};
}

export async function submitPrayerRequest(data: {
  name: string;
  category: string;
  request: string;
  isPrivate: boolean;
}) {
  return addDoc(prayerRequestsRef, {
    ...data,
    userId: "",
    status: "pending",
    source: "web",
    submittedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getAllPrayerRequests() {
  const q = query(prayerRequestsRef, orderBy("submittedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function markPrayerPrayed(id: string) {
  return updateDoc(doc(prayerRequestsRef, id), {
    status: "prayed",
    updatedAt: serverTimestamp(),
  });
}

export async function getSiteImages() {
  const snap = await getDocs(siteImagesRef);
  return snap.docs.map((d) => ({ key: d.id, ...d.data() }));
}

export async function setSiteImage(
  key: string,
  url: string,
  updatedBy: string
) {
  return setDoc(doc(siteImagesRef, key), {
    url,
    updatedAt: new Date().toISOString(),
    updatedBy,
  });
}

/* ── Admin CRUD helpers ─────────────────────────────────────────── */

export async function adminCreateDoc(
  collectionName: string,
  data: DocumentData
) {
  return addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function adminUpdateDoc(
  collectionName: string,
  docId: string,
  data: DocumentData
) {
  return updateDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function adminDeleteDoc(collectionName: string, docId: string) {
  return deleteDoc(doc(db, collectionName, docId));
}

export async function adminGetAll(
  collectionName: string,
  ...constraints: QueryConstraint[]
) {
  const q =
    constraints.length > 0
      ? query(collection(db, collectionName), ...constraints)
      : query(collection(db, collectionName));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export { onSnapshot, Timestamp, serverTimestamp };
