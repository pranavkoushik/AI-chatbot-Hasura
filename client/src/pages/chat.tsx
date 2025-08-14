import { useState } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import { useChats } from "@/hooks/useChats";

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { chats } = useChats();

  const selectedChat = chats.find((chat: any) => chat.id === selectedChatId);

  return (
    <div className="h-screen flex bg-slate-50">
      <ChatSidebar
        selectedChatId={selectedChatId}
        onChatSelect={setSelectedChatId}
      />
      <ChatArea
        selectedChatId={selectedChatId}
        chatTitle={selectedChat?.title}
      />
    </div>
  );
}
