"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import {
  getPaymentMethods,
  upsertPaymentMethod,
  deletePaymentMethod,
  type PaymentMethod,
} from "@/lib/payment-methods.server";

export async function fetchPaymentMethods(): Promise<PaymentMethod[]> {
  return getPaymentMethods();
}

export async function savePaymentMethod(
  id: string | null,
  data: Omit<PaymentMethod, "id">
): Promise<{ ok: true; method: PaymentMethod } | { ok: false; error: string }> {
  try {
    const method = await upsertPaymentMethod(id, data);
    revalidateTag("vpm-give", "max");
    revalidatePath("/give");
    return { ok: true, method };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function removePaymentMethod(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await deletePaymentMethod(id);
    revalidateTag("vpm-give", "max");
    revalidatePath("/give");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}
