import axios from "providers/axiosInstance";
import { io } from "socket.io-client";

export async function sendTextMessage(socket: io, textMessage: string) {
  //TODO: testing, change this to actual method later
  // try{
  //     const response = await axios.get(
  //         "http://www.google.com"
  //     );
  //     const data = await response.json();
  //     console.log("sendTextMessage success");
  // }catch{
  //     //pass
  //     console.error("sendTextMessage error"); //TODO: dispatch an error, showing a invalid pop up or something like that
  // }
  socket.emit("textMessage", { textMessage: textMessage });
}
