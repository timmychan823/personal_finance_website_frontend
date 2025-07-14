type FileFormat = "text"|"voice"
type MessageStatus = "sent"|"sending"|"received"

export interface ChatMessage {
    messageID: string,
    userID: string,
    datetime: Date,
    fileFormat: FileFormat,
    messageStatus: MessageStatus
}
export interface TextMessage extends ChatMessage {
    description: string
}
export interface VoiceMessage extends ChatMessage {
    voiceFile: string
}