import { NextRequest, NextResponse } from "next/server";
import { getImages } from "@/lib/images.server";
import type { SiteImage } from "@/lib/image-types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slot = searchParams.get("slot") as SiteImage["slot"] | null;
  const all = searchParams.get("all") === "true"; // admin mode: include hidden

  const images = await getImages(slot ?? undefined);
  const filtered = all ? images : images.filter((img) => img.active);
  const sorted = filtered.sort((a, b) => a.order - b.order);

  return NextResponse.json(sorted);
}
