import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = await currentUser();
    if (!user) {
        redirect("/");
    }
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
