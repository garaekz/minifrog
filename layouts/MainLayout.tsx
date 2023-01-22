import { ComponentChildren } from "preact";
import { Navbar } from "../components/Navbar.tsx";

export default function MainLayout({ children }: { children: ComponentChildren }) {
  return (
    <>
      <Navbar />
      <div class="container mx-auto">{children}</div>
    </>
  );
}