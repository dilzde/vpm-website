import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import type { CarouselSlot } from "./firestore";

/**
 * Uploads a file to Firebase Storage under carousels/{slot}/{timestamp}_{filename}
 * and returns { url, storagePath }.
 *
 * Pass an `onProgress` callback to receive 0–100 progress updates.
 */
export async function uploadCarouselImage(
  slot: CarouselSlot,
  file: File,
  onProgress?: (percent: number) => void
): Promise<{ url: string; storagePath: string }> {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storagePath = `carousels/${slot}/${timestamp}_${safeName}`;
  const storageRef = ref(storage, storagePath);

  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
    });

    task.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        onProgress?.(percent);
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve({ url, storagePath });
      }
    );
  });
}
