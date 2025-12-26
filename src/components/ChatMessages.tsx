import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
interface ChatMessageStructure {
    id?: string;
    message: string;
    sender: "user" | "robot";
    time?: number | string;
}

interface ChatMessagesProps {
  chatMessages: ChatMessageStructure[];
}


function useAutoScroll(dependencies: ChatMessageStructure[]) {
  const chatMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatMessageRef.current) {
      const element = chatMessageRef.current;
      element.scrollTop = element.scrollHeight
    }
  }, [dependencies]);
  return chatMessageRef;
}
function WelcomeMessage() {
  return (
    <p className="p-5 text-center">
      Welcome to the chatbot project! Send a message using the textbox below
    </p>
  );
}   
function ChatMessages({ chatMessages }: ChatMessagesProps) {
  const chatMessageRef = useAutoScroll(chatMessages);
  

  return (
    <div
      className="grow overflow-auto [scrollbar-width:none]"
      ref={chatMessageRef}
    >
      {chatMessages.length === 0 && <WelcomeMessage />}
      {chatMessages.length !== 0 && chatMessages.map((value, index) => {
        return (
          <ChatMessage
            key={index}
            message={value.message}
            sender={value.sender}
            time={value.time}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;
