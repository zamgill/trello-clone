import { auth } from "@/server/auth";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import UserMenu from "../_components/user-menu";

export default async function BoardsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <nav className="flex justify-between gap-2 px-4 py-2">
        <Link
          href="#"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Trello Clone
        </Link>
        <UserMenu user={session.user} />
      </nav>
      <div className="p-2">{children}</div>
    </>
  );
}
