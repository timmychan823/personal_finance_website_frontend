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
import { TextMessage } from 'types/chat/interfaces';

const ChatRoom = () => {
    const {chatRoomDisplayStatus, setChatRoomDisplayStatus, chatMessages, setChatMessages, socket, setSocket} = useChatBotContext();

    useEffect(()=>{
        const newSocket = io.connect(WEBSOCKET_URL, {extraHeaders: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}});
        newSocket.on('textMessageServerResponse', (message)=>{
            console.log(message.textMessageServerResponse);  //TODO: add text/ voice messsage into the chatMessageDisplay later
            const incomingChatMessage: TextMessage = {
                messageID: Date.now().toString(),
                messageStatus: 'received',
                userID: 'bot',
                datetime: new Date(),
                fileFormat: 'text',
                description: message.textMessageServerResponse,
            }
            setChatMessages((prevMessages)=>[...prevMessages, incomingChatMessage]); //need this so that it can get the most up-to-date chatMessages
        });
        setSocket(newSocket);

        return () => {
            setSocket((socket)=>{
                socket.disconnect()
                return null
            })
            console.log('Socket disconnected.');
        };

    }, []); //TODO: testing websocket, close connection when demounted

    useEffect(()=>{
        console.log("ChatRoom: ", !chatRoomDisplayStatus?"invisible":"visible");
    }, [chatRoomDisplayStatus]);

    return (
        chatRoomDisplayStatus&&
        <Paper sx={{ minWidth:500, maxWidth:500, position: 'fixed', bottom: 10, right: 10, zIndex: 1100}}>
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