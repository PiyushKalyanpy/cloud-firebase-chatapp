import ChatSidebar from "@/components/ChatSidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row w-full ">
      <div className="hidden md:flex w-1/4">
        <ChatSidebar />
      </div>
      <div className="w-full flex md:w-3/4">{children}</div>
    </div>
  );
}
