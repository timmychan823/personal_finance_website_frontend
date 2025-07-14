import {useEffect, useRef} from "react"
import { useChatBotContext } from "contexts/chatBot"
import Paper from '@mui/material/Paper';
import { ChatMessage, TextMessage } from "types/chat/interfaces";
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { UserProfile } from "types/userProfile/interfaces";

export default function ChatMessageDisplay(){
    const {chatMessages} = useChatBotContext()
    const lastItemRef = useRef(null)

    const currentUserProfile: UserProfile = {
        username: "Timmy Chan",
        userImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
    }
    const botProfile: UserProfile = {
        username: "Bot",
        userImage: "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937553.jpg"
    }

    useEffect(()=>{
        console.log(chatMessages)
        if (lastItemRef.current) {
            lastItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [chatMessages])
    
    return (
        <List sx={{overflow: 'auto', minHeight: 500, maxHeight:500}}>
            {chatMessages.map((chatMessage: ChatMessage, index, array) =>{
                    const isLastItem = (index === array.length-1);
                    if (chatMessage.fileFormat==="text"){
                        const textMessage = chatMessage as TextMessage
                        return(
                            <ListItem key={chatMessage.messageID} ref={isLastItem? lastItemRef : null} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={chatMessage.userID==="bot"?botProfile.username:currentUserProfile.username} src={chatMessage.userID==="bot"?botProfile.userImage:currentUserProfile.userImage} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={chatMessage.userID==="bot"?botProfile.username:currentUserProfile.username}
                                    secondary={textMessage.description}
                                    style={{ maxWidth: "fit-content", wordBreak: "break-word", whiteSpace: "pre-line"}}
                                />
                            </ListItem>
                        )
                    }

                }
            )}
        </List>
    )
    // TODO: get Avatar dynammically later
}