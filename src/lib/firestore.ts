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
export const carouselImagesRef = collection(db, "carouselImages");
export const paymentMethodsRef = collection(db, "paymentMethods");
export const eventsFirestoreRef = collection(db, "eventsFirestore");
export const socialLinksRef = collection(db, "socialLinks");

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

export interface RadioConfig {
  radioLogoUrl?: string | null;
  radioLogoStoragePath?: string | null;
  channelALive?: boolean;
  channelBLive?: boolean;
  nowBroadcastingTitle?: string;
  stationName?: string;
}

export async function getLivestreamConfig(): Promise<RadioConfig> {
  const snap = await getDoc(livestreamConfigRef);
  return (snap.data() as RadioConfig) || {};
}

export function subscribeRadioConfig(callback: (config: RadioConfig) => void) {
  return onSnapshot(livestreamConfigRef, (snap) => {
    callback((snap.data() as RadioConfig) || {});
  });
}

export async function updateRadioConfig(data: Partial<RadioConfig>) {
  return setDoc(livestreamConfigRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
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

/* ── Carousel Images (real-time, per slot) ──────────────────────── */

export type CarouselSlot = "hero" | "gallery" | "about" | "branches" | "media";

export interface CarouselImage {
  id: string;
  slot: CarouselSlot;
  url: string;
  storagePath: string;
  caption?: string;
  order: number;
  active: boolean;
  createdAt: unknown;
}

/**
 * Real-time listener — returns an unsubscribe function.
 * Calls `callback` immediately and on every Firestore change.
 */
export function subscribeCarouselImages(
  slot: CarouselSlot,
  callback: (images: CarouselImage[]) => void
) {
  const q = query(
    carouselImagesRef,
    where("slot", "==", slot),
    where("active", "==", true),
    orderBy("order", "asc")
  );
  return onSnapshot(q, (snap) => {
    callback(
      snap.docs.map((d) => ({ id: d.id, ...d.data() } as CarouselImage))
    );
  });
}

/**
 * One-time fetch for SSR/SSG contexts.
 */
export async function getCarouselImages(slot: CarouselSlot): Promise<CarouselImage[]> {
  const q = query(
    carouselImagesRef,
    where("slot", "==", slot),
    where("active", "==", true),
    orderBy("order", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CarouselImage));
}

export async function addCarouselImage(
  slot: CarouselSlot,
  url: string,
  storagePath: string,
  caption = "",
  order = 0
) {
  return addDoc(carouselImagesRef, {
    slot,
    url,
    storagePath,
    caption,
    order,
    active: true,
    createdAt: serverTimestamp(),
  });
}

export async function deleteCarouselImage(id: string) {
  return deleteDoc(doc(carouselImagesRef, id));
}

export async function updateCarouselImageOrder(id: string, order: number) {
  return updateDoc(doc(carouselImagesRef, id), { order, updatedAt: serverTimestamp() });
}

export async function updateCarouselImageCaption(id: string, caption: string) {
  return updateDoc(doc(carouselImagesRef, id), { caption, updatedAt: serverTimestamp() });
}

export async function toggleCarouselImageActive(id: string, active: boolean) {
  return updateDoc(doc(carouselImagesRef, id), { active, updatedAt: serverTimestamp() });
}

export async function getAllCarouselImagesForSlot(slot: CarouselSlot): Promise<CarouselImage[]> {
  const q = query(
    carouselImagesRef,
    where("slot", "==", slot),
    orderBy("order", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CarouselImage));
}

export { onSnapshot, Timestamp, serverTimestamp };

/* ── Payment Methods ────────────────────────────────────────────── */

export interface PaymentMethod {
  id: string;
  label: string;         // e.g. "M-Pesa Send Money"
  type: string;          // e.g. "mpesa" | "paypal" | "sendwave" | "till"
  value: string;         // number / email / username
  instructions?: string; // optional step-by-step text
  note?: string;         // optional scripture or extra note
  active: boolean;
  order: number;
}

export function subscribePaymentMethods(callback: (methods: PaymentMethod[]) => void) {
  const q = query(paymentMethodsRef, orderBy("order", "asc"));
  return onSnapshot(q, (snap) =>
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as PaymentMethod)))
  );
}

export async function upsertPaymentMethod(id: string | null, data: Omit<PaymentMethod, "id">) {
  if (id) {
    return updateDoc(doc(paymentMethodsRef, id), { ...data, updatedAt: serverTimestamp() });
  }
  return addDoc(paymentMethodsRef, { ...data, createdAt: serverTimestamp() });
}

export async function deletePaymentMethod(id: string) {
  return deleteDoc(doc(paymentMethodsRef, id));
}

/* ── Events (Firestore-backed) ───────────────────────────────────── */

export interface FirestoreEvent {
  id: string;
  title: string;
  description: string;
  date: string;           // ISO string "YYYY-MM-DD"
  time: string;
  location: string;
  isOnline: boolean;
  posterUrl?: string | null;
  posterStoragePath?: string | null;
  active: boolean;
  order: number;
  createdAt?: unknown;
}

export function subscribeEventsFirestore(callback: (events: FirestoreEvent[]) => void) {
  const q = query(eventsFirestoreRef, where("active", "==", true), orderBy("date", "asc"));
  return onSnapshot(q, (snap) =>
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreEvent)))
  );
}

export function subscribeAllEventsFirestore(callback: (events: FirestoreEvent[]) => void) {
  const q = query(eventsFirestoreRef, orderBy("date", "asc"));
  return onSnapshot(q, (snap) =>
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreEvent)))
  );
}

export async function addFirestoreEvent(data: Omit<FirestoreEvent, "id">) {
  return addDoc(eventsFirestoreRef, { ...data, createdAt: serverTimestamp() });
}

export async function updateFirestoreEvent(id: string, data: Partial<Omit<FirestoreEvent, "id">>) {
  return updateDoc(doc(eventsFirestoreRef, id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteFirestoreEvent(id: string) {
  return deleteDoc(doc(eventsFirestoreRef, id));
}

/* ── Social Links (Linktree) ─────────────────────────────────────── */

export interface SocialLink {
  id: string;
  label: string;      // e.g. "VPM Website"
  url: string;        // full URL
  icon: string;       // key: "website" | "radio" | "youtube" | "tiktok" | "instagram" | "x" | "whatsapp"
  description?: string;
  active: boolean;
  order: number;
}

export function subscribeSocialLinks(callback: (links: SocialLink[]) => void) {
  const q = query(socialLinksRef, orderBy("order", "asc"));
  return onSnapshot(q, (snap) =>
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as SocialLink)))
  );
}

export async function upsertSocialLink(id: string | null, data: Omit<SocialLink, "id">) {
  if (id) {
    return updateDoc(doc(socialLinksRef, id), { ...data, updatedAt: serverTimestamp() });
  }
  return addDoc(socialLinksRef, { ...data, createdAt: serverTimestamp() });
}

export async function deleteSocialLink(id: string) {
  return deleteDoc(doc(socialLinksRef, id));
}
