import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageInput } from "./MessageInput";
import { useMessages } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface ChatAreaProps {
  selectedChatId: string | null;
  chatTitle?: string;
}

export function ChatArea({ selectedChatId, chatTitle }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useAuth();
  const { messages, loading, sendMessage } = useMessages(selectedChatId);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!selectedChatId) {
      toast({
        title: "Error",
        description: "Please select a chat first",
        variant: "destructive",
      });
      return;
    }

    setIsTyping(true);
    try {
      await sendMessage(content);
      // Simulate AI thinking time
      setTimeout(() => setIsTyping(false), 2000);
    } catch (error) {
      setIsTyping(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  if (!selectedChatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md">
          <div className="h-16 w-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-robot text-white text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Welcome to AI Chat!</h3>
          <p className="text-slate-600">Select a chat or create a new one to start messaging with your AI assistant.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 gradient-primary rounded-full flex items-center justify-center">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {chatTitle || "AI Chat"}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                <span>AI Assistant Online</span>
                <span>•</span>
                <span>{messages.length} messages</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <i className="fas fa-search"></i>
            </Button>
            <Button variant="ghost" size="sm" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <i className="fas fa-info-circle"></i>
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.length === 0 && !loading ? (
          <div className="flex justify-center">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 max-w-md text-center">
              <div className="h-12 w-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-robot text-white"></i>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Welcome to AI Chat!</h3>
              <p className="text-sm text-slate-600">
                I'm your AI assistant powered by OpenRouter. How can I help you today?
              </p>
            </div>
          </div>
        ) : (
          messages.map((message: any) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-end space-x-2 max-w-2xl ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "user" 
                    ? "bg-slate-300" 
                    : "gradient-primary"
                }`}>
                  <i className={`fas ${message.role === "user" ? "fa-user" : "fa-robot"} text-white text-sm`}></i>
                </div>
                <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                  message.role === "user"
                    ? "gradient-primary text-white rounded-br-sm"
                    : "bg-white border border-slate-200 rounded-bl-sm"
                }`}>
                  <p className={`text-sm ${message.role === "user" ? "text-white" : "text-slate-800"}`}>
                    {message.content}
                  </p>
                  <div className={`flex items-center mt-2 space-x-2 ${message.role === "user" ? "justify-end" : ""}`}>
                    <span className={`text-xs ${message.role === "user" ? "opacity-75" : "text-slate-500"}`}>
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                    </span>
                    {message.role === "user" && (
                      <i className="fas fa-check-double text-xs opacity-75"></i>
                    )}
                    {message.role === "assistant" && (
                      <div className="flex space-x-1">
                        <button className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors">
                          <i className="fas fa-thumbs-up text-xs"></i>
                        </button>
                        <button className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors">
                          <i className="fas fa-thumbs-down text-xs"></i>
                        </button>
                        <button className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors">
                          <i className="fas fa-copy text-xs"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2">
              <div className="h-8 w-8 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-robot text-white text-sm"></i>
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-slate-200">
                <div className="flex space-x-1 items-center">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                  <span className="text-xs text-slate-500 ml-2">AI is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} isLoading={isTyping} />
    </div>
  );
}
