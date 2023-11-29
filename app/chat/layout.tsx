import ChatSidebar from "@/components/ChatSidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-row w-full ">
        <div className="flex w-1/4">
          <ChatSidebar />
        </div>
        <div className="flex w-3/4">{children}</div>
      </body>
    </html>
  );
}
