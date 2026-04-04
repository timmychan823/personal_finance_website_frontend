import { useEffect, useRef } from "react";
import { useChatBotContext } from "contexts/chatBot";
import { useUserContext } from "contexts/userContext";
import { ChatMessage, TextMessage } from "types/chat/interfaces";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { UserProfile } from "types/userProfile/interfaces";
import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";

export default function ChatMessageDisplay() {
  const { chatMessages } = useChatBotContext();
  const { userProfile } = useUserContext();
  const lastItemRef = useRef<null | HTMLLIElement>(null);

  const botProfile: UserProfile = {
    username: "Bot",
    userImage:
      "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937553.jpg",
  };

  useEffect(() => {
    console.log(chatMessages);
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [chatMessages]);

  return (
    <List sx={{ overflow: "auto", minHeight: 500, maxHeight: 500 }}>
      {chatMessages.map((chatMessage: ChatMessage, index, array) => {
        const isLastItem = index === array.length - 1;
        if (chatMessage.fileFormat === "text") {
          const textMessage = chatMessage as TextMessage;
          return (
            <>
              <ListItem
                key={chatMessage.messageID}
                ref={isLastItem ? lastItemRef : null}
                alignItems="center"
              >
                <ListItemAvatar>
                  <Avatar
                    alt={
                      chatMessage.userID === "bot"
                        ? botProfile.username
                        : userProfile?.username || "User"
                    }
                    src={
                      chatMessage.userID === "bot"
                        ? botProfile.userImage
                        : userProfile?.userImage || ""
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    chatMessage.userID === "bot"
                      ? botProfile.username
                      : userProfile?.username || "User"
                  }
                // secondary={textMessage.description}
                // style={{
                //   maxWidth: "fit-content",
                //   wordBreak: "break-word",
                //   whiteSpace: "pre-line",
                // }}
                />
              </ListItem>
              <Box sx={{ marginLeft: 1, marginRight: 1 }}>
                <ReactMarkdown>
                  {textMessage.description}
                </ReactMarkdown>
              </Box>
            </>
          );
        } else {
          return (<></>)
        }
      })}
    </List>
  );
  // TODO: get Avatar dynammically later
}
