import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useChats } from "@/hooks/useChats";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface ChatSidebarProps {
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
}

export function ChatSidebar({ selectedChatId, onChatSelect }: ChatSidebarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { chats, loading, createChat, deleteChat } = useChats();
  const { toast } = useToast();

  const handleCreateNewChat = async () => {
    try {
      const { data } = await createChat({
        variables: { title: "New Chat" },
      });
      if (data?.insert_chats_one) {
        onChatSelect(data.insert_chats_one.id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create new chat",
        variant: "destructive",
      });
    }
  };

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteChat({
        variables: { id: chatId },
      });
      if (selectedChatId === chatId) {
        onChatSelect("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete chat",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 gradient-primary rounded-full flex items-center justify-center">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">AI Chat</h1>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <i className="fas fa-ellipsis-vertical"></i>
            </Button>
            {userMenuOpen && (
              <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <i className="fas fa-user mr-3 text-slate-400"></i>Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <i className="fas fa-cog mr-3 text-slate-400"></i>Settings
                </a>
                <hr className="my-2" />
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-error hover:bg-slate-50"
                >
                  <i className="fas fa-sign-out-alt mr-3 text-error"></i>Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Button
          onClick={handleCreateNewChat}
          className="w-full gradient-primary text-white py-3 px-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
        >
          <i className="fas fa-plus mr-2"></i>
          New Chat
        </Button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-slate-500">Loading chats...</div>
        ) : chats.length === 0 ? (
          <div className="p-4 text-center text-slate-500">No chats yet. Create your first chat!</div>
        ) : (
          chats.map((chat: any) => {
            const lastMessage = chat.messages?.[0];
            const isSelected = selectedChatId === chat.id;
            
            return (
              <div key={chat.id} className="p-2">
                <button
                  onClick={() => onChatSelect(chat.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors border group ${
                    isSelected
                      ? "bg-primary/10 border-primary/20"
                      : "hover:bg-slate-50 border-transparent hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-slate-900 truncate">
                        {chat.title}
                      </h3>
                      {lastMessage && (
                        <p className="text-xs text-slate-500 mt-1 truncate">
                          {lastMessage.content}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Implement edit chat functionality
                        }}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded"
                      >
                        <i className="fas fa-edit text-xs"></i>
                      </button>
                      <button
                        onClick={(e) => handleDeleteChat(chat.id, e)}
                        className="p-1 text-slate-400 hover:text-error rounded"
                      >
                        <i className="fas fa-trash text-xs"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-400">
                      {formatDistanceToNow(new Date(chat.created_at), { addSuffix: true })}
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="h-2 w-2 bg-success rounded-full"></div>
                      <span className="text-xs text-slate-400">
                        {chat.messages?.length || 0}
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
          <span>Connected via GraphQL</span>
        </div>
      </div>
    </div>
  );
}
