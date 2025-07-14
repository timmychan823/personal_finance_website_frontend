import { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useChatBotContext } from "contexts/chatBot";

const ChatButton = () => {
  // useContext
  const { chatRoomDisplayStatus, setChatRoomDisplayStatus } =
    useChatBotContext();
  const openChatRoom = () => {
    setChatRoomDisplayStatus((chatRoomDisplayStatus) => !chatRoomDisplayStatus);
  };

  useEffect(() => {
    console.log(
      "ChatButton: ",
      chatRoomDisplayStatus ? "invisible" : "visible",
    );
  }, [chatRoomDisplayStatus]);

  return (
    !chatRoomDisplayStatus && (
      <IconButton
        size="large"
        aria-label="chatButton"
        sx={{ position: "fixed", bottom: 10, right: 10, zIndex: 1100 }}
        onClick={openChatRoom} //TODO: toggle the chatroom using the ChatBotContext
        color="primary"
      >
        <SmartToyIcon />
      </IconButton>
    )
  );
};

export default ChatButton;
