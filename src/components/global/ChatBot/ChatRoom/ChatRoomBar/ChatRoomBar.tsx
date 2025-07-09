import {useEffect} from 'react'
import { useChatBotContext } from 'contexts/chatBot';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { UserProfile } from 'types/userProfile/interfaces';
import Avatar from '@mui/material/Avatar';

const ChatRoomBar = () => {
    const {status, setStatus} = useChatBotContext();
    const closeChatRoom = () =>{
        setStatus(status=>!status)
    }
    const botProfile: UserProfile = {
        username: "Bot",
        userImage: "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937553.jpg"
    }

    return (
        <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{padding: "10px 10px", margin:"10px 10px"}}>
                <Avatar alt={botProfile.UserImage} src={botProfile.UserImage} />
                <h4>ChatRoom</h4>
            </Stack>
            <IconButton             
                size="large"
                aria-label="closeChatRoomButton"
                onClick={closeChatRoom} 
                color="primary"
                sx={{margin:"10px 10px"}}>
                <CloseIcon/>
            </IconButton>
        </Stack>
    )

}

export default ChatRoomBar;