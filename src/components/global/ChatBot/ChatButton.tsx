import {useEffect} from 'react'
import IconButton from '@mui/material/IconButton';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useChatBotContext } from 'contexts/chatBot';

const ChatButton = () => {
    // useContext
    const { status, setStatus } = useChatBotContext();
    const openChatRoom = () => {
        setStatus(status=>!status);
    }

    useEffect(()=>{
        console.log("ChatButton: ", status?"invisible":"visible");
    }, [status])

    return (
        !status&&<IconButton             
            size="large"
            aria-label="chatButton"
            sx={{ position: 'fixed', bottom: 10, right: 10}}
            onClick={openChatRoom} //TODO: toggle the chatroom using the ChatBotContext
            color="primary">
            <SmartToyIcon/>
        </IconButton>
    )
}

export default ChatButton;