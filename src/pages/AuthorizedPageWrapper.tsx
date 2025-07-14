//wrap the page with AppBar and NavMenu
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box';
import ResponsiveAppBar from 'components/global/ResponsiveAppBar'
import { UserProfile } from 'types/userProfile/interfaces'
import ChatBotContext, { useChatBotContextState } from 'contexts/chatBot'
import ChatButton from 'components/global/ChatBot/ChatButton'
import ChatRoom from 'components/global/ChatBot/ChatRoom/ChatRoom'

const AuthorizedPageWrapper = () => {
    const chatBotState = useChatBotContextState()

    const pages = ['news', 'financing', 'investing'];
    const settings = ['profile', 'logout'];
    const currentUserProfile: UserProfile = {
        username: "Timmy Chan",
        userImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
    } //TODO: get it from userContext and set it when you login or you have already logged in

    return (
        <ChatBotContext.Provider value={chatBotState}>   
            <ResponsiveAppBar pages={pages} settings={settings} currentUserProfile={currentUserProfile}/>
            <Box sx={{margin: "0px 8px"}}>
                <ChatRoom/>
                <ChatButton/>
                <Outlet />
            </Box>
        </ChatBotContext.Provider>         
    )
}

export default AuthorizedPageWrapper

