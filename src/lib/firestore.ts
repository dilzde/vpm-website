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
export const socialLinksConfigRef = doc(db, "config", "socialLinks");

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
  icon: string;       // key: "website" | "radio" | "youtube" | "tiktok" | "instagram" | "facebook" | "x" | "whatsapp" | "default"
  description?: string;
  active: boolean;
  order: number;
}

export const INITIAL_DEFAULT_LINKS: SocialLink[] = [
  { id: "vpm-website", label: "VPM International Website", url: "https://vpminternational.org", icon: "website", description: "Our official ministry website", active: true, order: 0 },
  { id: "asriel-radio", label: "Asriel Radio Live", url: "https://asrielradio.com", icon: "radio", description: "24/7 prophetic radio stream", active: true, order: 1 },
  { id: "youtube-channel", label: "YouTube Channel", url: "https://youtube.com/@vpminternational", icon: "youtube", description: "Sermons, revivals & live broadcasts", active: true, order: 2 },
  { id: "tiktok", label: "TikTok", url: "https://tiktok.com/@vpminternational", icon: "tiktok", description: "Short prophetic clips & highlights", active: true, order: 3 },
  { id: "instagram", label: "Instagram", url: "https://instagram.com/vpminternational", icon: "instagram", description: "Ministry moments & announcements", active: true, order: 4 },
  { id: "x-twitter", label: "X (Twitter)", url: "https://x.com/vpminternational", icon: "x", description: "", active: true, order: 5 },
  { id: "whatsapp", label: "WhatsApp", url: "https://wa.me/254759265819", icon: "whatsapp", description: "Join our community", active: true, order: 6 },
];

const LOCAL_STORAGE_KEY = "vpm_social_links_cache_v3";
const CUSTOMIZED_KEY = "vpm_social_links_customized_v3";
const SYNC_EVENT_NAME = "vpm_social_links_updated_v3";

function getLocalLinks(): SocialLink[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn("Failed to read local links cache:", err);
  }
  return null;
}

function saveLocalLinks(links: SocialLink[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(links));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME, { detail: links }));
  } catch (err) {
    console.warn("Failed to write local links cache:", err);
  }
}

/**
 * Self-healing merger:
 * If previous bugs left the user with only 1 or 2 links, this automatically
 * preserves the user's custom/edited link while restoring the missing official default links.
 */
function healMissingOfficialLinks(incoming: SocialLink[]): SocialLink[] {
  if (!incoming || incoming.length === 0) return [...INITIAL_DEFAULT_LINKS];

  // If the user has fewer than 4 links and hasn't explicitly purged them,
  // ensure the official ministry links aren't lost.
  const isCustomized = typeof window !== "undefined" && localStorage.getItem(CUSTOMIZED_KEY) === "true";
  if (!isCustomized && incoming.length < 4) {
    const existingIds = new Set(incoming.map((l) => l.id));
    const existingLabels = new Set(incoming.map((l) => l.label.toLowerCase().trim()));

    const missingDefaults = INITIAL_DEFAULT_LINKS.filter(
      (d) => !existingIds.has(d.id) && !existingLabels.has(d.label.toLowerCase().trim())
    );

    const merged = [...incoming, ...missingDefaults].map((item, idx) => ({
      ...item,
      order: typeof item.order === "number" ? item.order : idx,
    }));

    merged.sort((a, b) => a.order - b.order);
    return merged;
  }

  return incoming;
}

/**
 * Saves links across collection & config documents in Firestore.
 */
async function syncLinksToCloud(links: SocialLink[]): Promise<void> {
  // 1. Atomic array in collection(db, "socialLinks") document "--all--"
  try {
    await setDoc(
      doc(socialLinksRef, "--all--"),
      {
        links,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn("Notice syncing --all-- doc:", err);
  }

  // 2. Also save to doc(db, "config", "socialLinks") as backup
  try {
    await setDoc(
      socialLinksConfigRef,
      {
        links,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch {
    // ignore
  }

  // 3. Dual-sync each individual doc in socialLinksRef
  try {
    for (const item of links) {
      const { id, ...rest } = item;
      setDoc(
        doc(socialLinksRef, id),
        { ...rest, updatedAt: serverTimestamp() },
        { merge: true }
      ).catch(() => {});
    }
  } catch {
    // ignore
  }
}

export function subscribeSocialLinks(callback: (links: SocialLink[]) => void) {
  // 1. Immediately provide local cache or defaults for 0ms initial render
  const local = getLocalLinks();
  if (local && local.length > 0) {
    const healed = healMissingOfficialLinks(local);
    saveLocalLinks(healed);
    callback(healed);
  } else {
    saveLocalLinks(INITIAL_DEFAULT_LINKS);
    callback(INITIAL_DEFAULT_LINKS);
  }

  // 2. Listen to cross-tab / window sync events
  const handleLocalSync = (e: Event) => {
    const customEvent = e as CustomEvent<SocialLink[]>;
    if (customEvent.detail && Array.isArray(customEvent.detail)) {
      callback(customEvent.detail);
    } else {
      const updated = getLocalLinks();
      if (updated && updated.length > 0) callback(updated);
    }
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === LOCAL_STORAGE_KEY) {
      const updated = getLocalLinks();
      if (updated && updated.length > 0) callback(updated);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener(SYNC_EVENT_NAME, handleLocalSync);
    window.addEventListener("storage", handleStorage);
  }

  // 3. Live real-time Firestore listener on socialLinks collection (syncs across all devices)
  let unsubCollection: (() => void) | null = null;
  try {
    unsubCollection = onSnapshot(
      socialLinksRef,
      (snap) => {
        if (!snap.empty) {
          // Check if --all-- summary document exists
          const allDoc = snap.docs.find((d) => d.id === "--all--");
          if (allDoc && Array.isArray(allDoc.data().links) && allDoc.data().links.length > 0) {
            const rawLinks = allDoc.data().links as SocialLink[];
            const healed = healMissingOfficialLinks(rawLinks);
            saveLocalLinks(healed);
            callback(healed);
            return;
          }

          // Otherwise map individual documents
          const itemDocs = snap.docs
            .filter((d) => !d.id.startsWith("--"))
            .map((d) => ({ id: d.id, ...d.data() } as SocialLink));

          if (itemDocs.length > 0) {
            itemDocs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            const healed = healMissingOfficialLinks(itemDocs);
            saveLocalLinks(healed);
            callback(healed);
            return;
          }
        }

        // If collection has nothing, check config doc or seed defaults
        checkConfigOrSeed();
      },
      (err) => {
        console.warn("Firestore socialLinks listener notice (using local cache):", err.message);
      }
    );
  } catch (err) {
    console.warn("Firestore socialLinks setup error:", err);
  }

  async function checkConfigOrSeed() {
    try {
      const cfgSnap = await getDoc(socialLinksConfigRef);
      if (cfgSnap.exists() && Array.isArray(cfgSnap.data().links) && cfgSnap.data().links.length > 0) {
        const healed = healMissingOfficialLinks(cfgSnap.data().links);
        saveLocalLinks(healed);
        callback(healed);
      } else {
        await syncLinksToCloud(INITIAL_DEFAULT_LINKS);
      }
    } catch {
      // offline fallback
    }
  }

  return () => {
    if (unsubCollection) unsubCollection();
    if (typeof window !== "undefined") {
      window.removeEventListener(SYNC_EVENT_NAME, handleLocalSync);
      window.removeEventListener("storage", handleStorage);
    }
  };
}

export async function upsertSocialLink(
  id: string | null,
  data: Omit<SocialLink, "id">
): Promise<string> {
  const current = getLocalLinks() ?? [...INITIAL_DEFAULT_LINKS];
  const targetId = id || ("link-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7));

  const existingIndex = current.findIndex((l) => l.id === targetId);
  const updatedItem: SocialLink = {
    id: targetId,
    ...data,
    order: typeof data.order === "number" ? data.order : current.length,
  };

  let updatedList: SocialLink[];
  if (existingIndex >= 0) {
    // Update the existing link in-place (keeps all other links untouched!)
    updatedList = current.map((l) => (l.id === targetId ? updatedItem : l));
  } else {
    // Add new link to the directory (keeps all existing links untouched!)
    updatedList = [...current, updatedItem];
  }

  // Ensure sequential order
  updatedList.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // 1. Instant local persistence & UI broadcast (0ms delay)
  saveLocalLinks(updatedList);

  // 2. Direct cloud write to target document AND atomic summary (real-time WebSocket broadcast)
  const syncTask = async () => {
    await setDoc(doc(socialLinksRef, targetId), { ...updatedItem, updatedAt: serverTimestamp() }, { merge: true });
    await syncLinksToCloud(updatedList);
  };
  syncTask().catch((err) => {
    console.warn("Cloud sync error:", err);
  });

  return targetId;
}

export async function deleteSocialLink(id: string): Promise<void> {
  const current = getLocalLinks() ?? [...INITIAL_DEFAULT_LINKS];
  const filtered = current.filter((l) => l.id !== id);

  if (typeof window !== "undefined") {
    localStorage.setItem(CUSTOMIZED_KEY, "true");
  }

  // 1. Instant local update
  saveLocalLinks(filtered);

  // 2. Cloud delete
  const deleteTask = async () => {
    await deleteDoc(doc(socialLinksRef, id)).catch(() => {});
    await syncLinksToCloud(filtered);
  };
  deleteTask().catch((err) => {
    console.warn("Cloud delete error:", err);
  });
}

export async function resetSocialLinksToDefaults(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CUSTOMIZED_KEY);
  }
  saveLocalLinks(INITIAL_DEFAULT_LINKS);
  await syncLinksToCloud(INITIAL_DEFAULT_LINKS);
}

