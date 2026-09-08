/**
 * SERVER-ONLY — payment methods data layer via GitHub API.
 */
import { readJsonFile, writeJsonFile } from "./github.server";

export interface PaymentMethod {
  id: string;
  label: string;
  type: string;   // "mpesa" | "till" | "paypal" | "sendwave" | "bank" | "other"
  value: string;
  instructions?: string;
  note?: string;
  active: boolean;
  order: number;
}

const DATA_PATH = "public/data/payment-methods.json";

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  return readJsonFile<PaymentMethod[]>(DATA_PATH, []);
}

export async function savePaymentMethods(methods: PaymentMethod[]): Promise<void> {
  await writeJsonFile(DATA_PATH, methods, "chore: update payment-methods.json via admin panel");
}

export async function upsertPaymentMethod(
  id: string | null,
  data: Omit<PaymentMethod, "id">
): Promise<PaymentMethod> {
  const all = await getPaymentMethods();
  if (id) {
    const updated = all.map((m) => m.id === id ? { ...m, ...data } : m);
    await writeJsonFile(DATA_PATH, updated, "chore: update payment method via admin");
    return { id, ...data };
  }
  const newMethod: PaymentMethod = {
    id: `pm-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    ...data,
  };
  await writeJsonFile(DATA_PATH, [...all, newMethod], "feat: add payment method via admin");
  return newMethod;
}

export async function deletePaymentMethod(id: string): Promise<void> {
  const all = await getPaymentMethods();
  await writeJsonFile(
    DATA_PATH,
    all.filter((m) => m.id !== id),
    "chore: delete payment method via admin"
  );
}
