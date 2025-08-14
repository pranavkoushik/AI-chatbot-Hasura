import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface MessageInputProps {
  onSendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
}

export function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 128) + "px";
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const messageToSend = message;
    setMessage("");
    
    try {
      await onSendMessage(messageToSend);
    } catch (error) {
      // Error handling is done in the parent component
      setMessage(messageToSend); // Restore message on error
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white border-t border-slate-200 p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Shift + Enter for new line)"
              rows={1}
              className="w-full resize-none rounded-2xl border border-slate-300 px-4 py-3 pr-20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm max-h-32 overflow-y-auto"
              style={{ minHeight: "48px" }}
            />
            
            {/* Input Actions */}
            <div className="absolute bottom-2 right-2 flex items-center space-x-1">
              <button
                type="button"
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
              >
                <i className="fas fa-paperclip text-sm"></i>
              </button>
              <button
                type="button"
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
              >
                <i className="fas fa-smile text-sm"></i>
              </button>
            </div>
          </div>
          
          {/* Character Count & Hint */}
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-slate-400">
              <span>{message.length}</span>/1000 characters
            </div>
            <div className="text-xs text-slate-400">
              Press <kbd className="bg-slate-100 px-1 rounded text-xs">Enter</kbd> to send
            </div>
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="h-12 w-12 gradient-primary text-white rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:scale-105 active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <i className="fas fa-paper-plane"></i>
          )}
        </Button>
      </form>

      {/* Status Bar */}
      <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-success rounded-full"></div>
            <span>Connected</span>
          </div>
          <div className="flex items-center space-x-1">
            <i className="fas fa-shield-alt text-primary"></i>
            <span>End-to-end secured</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <i className="fas fa-zap text-warning"></i>
          <span>Powered by OpenRouter AI</span>
        </div>
      </div>
    </div>
  );
}
