import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VPM International — All Links",
  description: "Connect with Voice of the Potter's Messengers International across all platforms.",
  robots: { index: false, follow: false },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import React from "react";
