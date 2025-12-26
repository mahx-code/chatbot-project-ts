import { useState } from "react";
import { Chatbot } from "supersimpledev";
import loadingSpinner from "../assets/loading-spinner.gif";
import dayjs from "dayjs";
interface ChatMessage {
  message: string;
  sender: "user" | "robot";
  time?: string; // Optional because the loading state might not have time
}
interface PropsType {
  chatMessages: ChatMessage[]; // Must be an array
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  children?: string;
}
// Input Box Component
export function ChatInput({
  chatMessages,
  setChatMessages,
  children,
}: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setNewData] = useState("");
  const placeHolder = children || "Send a message to Chatbot";

  function keyboardEffect(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      sendChat();
    }
    if (e.key === "Escape") {
      setNewData("");
    }
  }
  function storeData(event: React.ChangeEvent<HTMLInputElement>) {
    setNewData(event.target.value);
  }

  async function sendChat() {
    if (data) {
      const newChatMessages: ChatMessage[] = [
        ...chatMessages,
        {
          message: data,
          sender: "user",
          time: dayjs(dayjs().valueOf()).format("HH:mm"),
        },
        {
          message: `<img style='height: 50px; width: 50px;' src='${loadingSpinner}'/>`,
          sender: "robot",
        },
      ];

      setChatMessages(newChatMessages);
      setNewData("");
      setIsLoading(true);
      const response = await Chatbot.getResponseAsync(data);
      setIsLoading(false);
      setChatMessages([
        ...newChatMessages.slice(0, -1),
        {
          message: response,
          sender: "robot",
          time: dayjs(dayjs().valueOf()).format("HH:mm"),
        },
      ]);
    }
  }

  return (
    <div className="w-[60%] flex justify-center">
      <input
        type="text"
        name="user-input"
        placeholder={placeHolder}
        onChange={storeData}
        className="p-2 border m-4  rounded w-[40%]"
        value={data}
        onKeyDown={keyboardEffect}
        disabled={isLoading}
      />
      <button
        className="px-8  py-2 rounded cursor-pointer bg-green-900 text-white m-4"
        onClick={sendChat}
      >
        Send
      </button>
    </div>
  );
}
