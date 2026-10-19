import { redirect } from "next/navigation";

export const metadata = {
  title: "Your Chats",
  robots: { index: false, follow: false },
};

export default function ChatsRedirectPage() {
  redirect("/user/chat");
}
