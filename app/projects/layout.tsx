import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trak Projects",
};

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
