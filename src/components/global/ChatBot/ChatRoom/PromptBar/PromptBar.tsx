import {useState, useEffect} from 'react'
import { useChatBotContext } from "contexts/chatBot"
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { TextMessage } from 'types/chat/interfaces';
import { sendTextMessage } from 'services/ChatService/chatService';

// export interface ChatMessage {
//     messageID: string,
//     userID: string,
//     datetime: Date,
//     fileFormat: FileFormat,
//     messageStatus: MessageStatus
// }
// export interface TextMessage extends ChatMessage {
//     description: string
// }
// export interface VoiceMessage extends ChatMessage {
//     voiceFile: string
// }
export default function PromptBar(){
    const {chatMessages, setChatMessages} = useChatBotContext();
    const {socket} = useChatBotContext();
    const [textMessageToBeSent, setTextMessageToBeSent] = useState("");

    const handlePromptTextChange = (event)=> {
        setTextMessageToBeSent(event.target.value)
    }
    // useEffect(()=>{
    //     console.log(textMessageToBeSent);
    // }, [textMessageToBeSent]);

    async function handleSendTextMessage(textMessageStringToBeSent:string){
        console.log("textMessageStringToBeSent", textMessageStringToBeSent)
        // setChatMessages(...chatMessageToBeSent,chatMessage); //currently only support textMessage
        const textMessageToBeSent: TextMessage = {
            messageID: Date.now().toString(), //come from backend, maybe we should exclude it when send from client side
            userID: "1", //come from backend, maybe we should exclude it when send from client side 
            datetime: new Date(),
            messageStatus: "sending",
            fileFormat: "text",
            description: textMessageStringToBeSent
        }
        setChatMessages([...chatMessages, textMessageToBeSent]);
        //add send message to backend service and logic later
        sendTextMessage(socket, textMessageToBeSent.description); //TODO: change this to actual method and correct object type later
        setTextMessageToBeSent("");
    }   

    return (
        <Stack width="90%" direction="row" justifyContent="space-between" alignItems="end" spacing={2} style={{margin:"10px 10px"}}>
            <TextField
                maxRows={4}
                minRows={1}
                multiline
                aria-label="chatBotPromptArea"
                value={textMessageToBeSent}
                onChange={handlePromptTextChange}
                style={{ maxWidth: 400, minWidth: 400, margin:"0px 10px"}}
            />
            <IconButton aria-label="sendChatMessageButton" size="small" onClick={()=>handleSendTextMessage(textMessageToBeSent)} style={{margin:"0px 10px"}}>
                <SendIcon/>
            </IconButton>
        </Stack>
    )
}  
