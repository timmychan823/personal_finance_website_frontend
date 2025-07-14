import { createContext, useContext, useState } from "react";
import { EMPTY_VOID } from "types";
import { ChatMessage } from "types/chat/interfaces";
import { io } from "socket.io-client";

export interface IChatBotContext {
  chatRoomDisplayStatus: Boolean;
  chatMessages: ChatMessage[];
  socket: io;
  setChatRoomDisplayStatus: (newStatus: Boolean) => void;
  setChatMessages: (newChatMessages: ChatMessage[]) => void;
  setSocket: (newSocket: io) => void;
}

export function useChatBotContextState(): IChatBotContext {
  const [chatRoomDisplayStatus, setChatRoomDisplayStatus] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  return {
    chatRoomDisplayStatus,
    setChatRoomDisplayStatus,
    chatMessages,
    setChatMessages,
    socket,
    setSocket,
  };
}

export const ChatBotContext = createContext<IChatBotContext>({
  // getter
  chatRoomDisplayStatus: false as Boolean,
  setChatRoomDisplayStatus: EMPTY_VOID as (newStatus: Boolean) => void,
  chatMessages: [] as ChatMessage[],
  setChatMessages: EMPTY_VOID as (newChatMessages: ChatMessage[]) => void,
  socket: null as io,
  setSocket: EMPTY_VOID as (newSocket: io) => void,
});

export const useChatBotContext = () => useContext(ChatBotContext);
export default ChatBotContext;
