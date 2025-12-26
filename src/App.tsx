import { useState, useEffect, Fragment } from "react";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import { Chatbot } from "supersimpledev";
import "./App.css";
import robotImage from "./assets/robot.png";

function App() {
  useEffect(() => {
    Chatbot.addResponses({
      "Are you smart?": "I try to be!",
      "What is your purpose?": "To chat with you and answer simple questions.",
      "Do you sleep?": "Nope! I’m always awake.",
      "Are you a robot?": "I’m a software robot!",
      "Can you learn?":
        "I don’t learn automatically, but you can update my code!",
      "What language do you speak?": "I speak JavaScript!",
      "Do you like pizza?": "If I had taste buds, I bet I would!",
      "Who made computers?":
        "Many inventors contributed, but Charles Babbage is known as the father of computing.",
      "What is a variable?": "A variable stores data in programming.",
      "Explain function": "A function is a reusable block of code.",
      "Explain array": "An array stores multiple values in one variable.",
      "Explain object": "An object holds key-value pairs.",
      "What is JSON?":
        "JSON is a lightweight format for storing and transporting data.",
      "What is a bug?": "A bug is an error in code.",
      "How to fix bugs?": "You debug by checking code and testing.",
      "What is debugging?":
        "Debugging is finding and fixing issues in your code.",
      "What is UI?": "UI means User Interface.",
      "What is UX?": "UX means User Experience.",
      "What is database?": "A database stores organized information.",
      "What is SQL?": "SQL is a language for managing databases.",
      "What is Git?": "Git is a version control system.",
      "What is GitHub?": "GitHub is a platform for hosting Git repositories.",
      "What is Internet?":
        "The internet is a global network connecting computers.",
      "What is a website?":
        "A website is a collection of web pages accessible online.",
      "How do I learn coding?":
        "Start small, practice daily, and build projects!",
      "Teach me JavaScript":
        "Sure! Start by learning variables, functions, and loops.",
      "Teach me HTML": "Begin with tags like <html>, <head>, <body>.",
      "Teach me CSS": "Try basic properties like color, margin, padding.",
      "Explain AI":
        "AI allows machines to perform tasks requiring human intelligence.",
      "Explain chatbot":
        "A chatbot simulates human conversation using rules or AI.",
      "Explain machine learning": "ML teaches computers to learn from data.",
      "What is a server?": "A server provides data or services over a network.",
      "What is frontend?": "The part of a website users interact with.",
      "What is backend?": "The server-side logic behind the scenes.",
      "What is fullstack?": "Someone who works on both frontend and backend.",
      "Tell me a riddle": "What has keys but can’t open locks? A keyboard!",
      "Give me motivation":
        "You can do anything with consistency and practice!",
      "Inspire me": "Every expert was once a beginner—keep going!",
      "Tell me something": "Here’s something: You're doing great by learning!",
      "Do you have emotions?": "Not really, but I understand yours!",
      "Do you love me?": "I love chatting with you!",
      "Can you dance?": "Not physically, but I can wiggle code!",
      "What is CPU?": "The CPU is the brain of the computer.",
      "What is RAM?": "RAM stores data the computer is currently using.",
      "What is storage?": "Storage keeps data even when the device is off.",
      "What is WiFi?":
        "Wireless technology that connects devices to the internet.",
      "What is Bluetooth?": "Tech for short-range wireless communication.",
      "What is USB?": "A standard for connecting devices.",
      "Tell me quote": '"Success is not final; failure is not fatal."',
      "Give me advice": "Practice small tasks daily—it compounds!",
      "Explain DOM": "The DOM represents the structure of a webpage.",
      "Explain event listener":
        "It waits for user actions like clicks or keypresses.",
      "What is compiler?": "A compiler transforms code into machine language.",
      "What is terminal?": "A text-based interface to run commands.",
      "What is operating system?": "Software that manages hardware and files.",
      "What is IP address?": "A unique address for devices on a network.",
    });
  }, []);
  interface Message {
    id?: string;
    message: string;
    sender: "user" | "robot";
    time?: string;
  }
  const [chatMessages, setChatMessages] = useState<Message[]>(
    () => {
      const saved = localStorage.getItem("messages");

      if (saved !== null) {
        return JSON.parse(saved)
      }
      return [];
    }
  );

  const title = "(" + chatMessages.length + ") messages";

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);
  function clearMessage() {
    setChatMessages([]);
    localStorage.removeItem("messages");
  }
  return (
    <Fragment>
      <link rel="icon" href={robotImage} />
      <title>{title}</title>
      <div className="w-[100%] h-[100vh] flex flex-col">
        <ChatMessages
          chatMessages={chatMessages}
        />
        <div className="flex justify-center">
          <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
          />

          <button
            onClick={clearMessage}
            className="px-8  py-2 rounded cursor-pointer bg-green-900 text-white my-4"
          >
            Clear
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
