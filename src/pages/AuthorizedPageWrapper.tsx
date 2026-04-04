//wrap the page with AppBar and NavMenu
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "components/global/ResponsiveAppBar";
import ChatBotContext, { useChatBotContextState } from "contexts/chatBot";
import UserContext, { useUserContextState } from "contexts/userContext";
import ChatButton from "components/global/ChatBot/ChatButton";
import ChatRoom from "components/global/ChatBot/ChatRoom/ChatRoom";

const AuthorizedPageWrapper = () => {
  const chatBotState = useChatBotContextState();
  const userState = useUserContextState();

  const pages = ["financing", "investing"];
  const settings = ["logout"];

  return (
    <UserContext.Provider value={userState}>
      <ChatBotContext.Provider value={chatBotState}>
        <ResponsiveAppBar
          pages={pages}
          settings={settings}
        />
        <Box sx={{ margin: "0px 8px" }}>
          <ChatRoom />
          <ChatButton />
          <Outlet />
        </Box>
      </ChatBotContext.Provider>
    </UserContext.Provider>
  );
};

export default AuthorizedPageWrapper;
