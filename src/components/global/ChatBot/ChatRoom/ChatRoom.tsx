import {useEffect} from 'react'
import { useChatBotContext } from 'contexts/chatBot';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ChatRoomBar from 'components/global/ChatBot/ChatRoom/ChatRoomBar/ChatRoomBar'
import ChatMessageDisplay from './ChatMessageDisplay/ChatMessageDisplay';
import PromptBar from './PromptBar/PromptBar';
import Divider from '@mui/material/Divider';
import {WEBSOCKET_URL} from 'constants/chat';
import {io} from 'socket.io-client';

const ChatRoom = () => {
    const {status, setStatus} = useChatBotContext();
    const {socket, setSocket} = useChatBotContext();

    useEffect(()=>{
        const socket = io.connect(WEBSOCKET_URL);
        socket.on('textMessageServerResponse', (message)=>{
            console.log(message);  //TODO: add text/ voice messsage into the chatMessageDisplay later
        });
        setSocket(socket);
    }, []); //TODO: testing websocket, close connection when demounted

    useEffect(()=>{
        console.log("ChatRoom: ", !status?"invisible":"visible");
    }, [status]);

    return (
        status&&
        <Paper sx={{ minWidth:500, maxWidth:500, position: 'fixed', bottom: 10, right: 10}}>
            <Stack direction="column">
                <ChatRoomBar></ChatRoomBar>
                <Divider/>
                <ChatMessageDisplay></ChatMessageDisplay>
                <Divider/>
                <PromptBar></PromptBar>
            </Stack>
        </Paper>
    )
}

export default ChatRoom;