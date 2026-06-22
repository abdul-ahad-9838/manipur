import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata({
  title: "Research Overview",
  description:
    "Research activities and initiatives at Manipur International University. Explore MIU's research centers, projects and publications.",
  path: "/research/overview",
});
export default function Layout({ children }) {
  return children;
}
