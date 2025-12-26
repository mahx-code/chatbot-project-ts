import robotImage from "../assets/robot.png";
import userProfileImage from "../assets/woman-img.jpg";

interface ChatMessageProps {
  message: string;
  sender: "user" | "robot";
  time?: string | number;
}

// Chat Message Component
export function ChatMessage({ message, sender, time }:ChatMessageProps) {
  // const message = props.message;
  // const sender = props.sender;

  // const { message, sender } = props;
  if (!time) {
    time = "Loading...";
  }
  return (
    <div
      style={{
        margin: "20px auto",
        display: "flex",
        gap: "10px",
        width: "60%",
        justifyContent:
          sender.toLowerCase() === "robot" ? "flex-start" : "flex-end",
      }}
    >
      {sender === "robot" && (
        <img src={robotImage} alt="robot pic" className="h-[45px] w-[45px]" />
      )}
      <p
        style={{
          padding: "15px 20px",
          display: "block",
          maxWidth: "300px",
          borderRadius: "4px",
          backgroundColor: "rgb(230,240,240)",
        }}
        dangerouslySetInnerHTML={{
          __html:
            message +
            `<br /><p style="font-size:0.8em" class=${sender === "user" ? "text-right" : "text-left"}>${time}</p>`,
        }}
      ></p>
      {sender === "user" && (
        <img
          src={userProfileImage}
          alt="user pic"
          width="40"
          height="21"
          className="h-[45px] w-[45px] rounded-[45px] object-cover"
        />
      )}
    </div>
  );

}
