import {
    ParseMode,
    MessageEntity,
    InlineKeyboardMarkup,
    ReplyKeyboardMarkup,
    ReplyKeyboardRemove,
    ForceReply,
} from 'typegram';

export type ChatType = {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chat_id: number | string
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    message_thread_id?: number
}

type SenderOptionsType = ChatType & {
    /** Mode for parsing entities in the message text. See formatting options for more details. */
    parse_mode?: ParseMode
    /** Protects the contents of the sent message from forwarding and saving */
    protect_content?: boolean
    /** If the message is a reply, ID of the original message */
    reply_to_message_id?: number
    /** Pass True if the message should be sent even if the specified replied-to message is not found */
    allow_sending_without_reply?: boolean
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
}

export type SendMessageOptionsType = SenderOptionsType & {
    /** Text of the message to be sent, 1-4096 characters after entities parsing */
    text: string
    /** A list of special entities that appear in message text, which can be specified instead of parse_mode */
    entities?: MessageEntity[]
    /** Boolean Disables link previews for links in this message */
    disable_web_page_preview?: boolean
}

export type SendPhotoOptionsType = SenderOptionsType & {
    /** Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. */
    photo: string | Blob | GoogleAppsScript.Base.Blob
    /** Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing */
    caption?: string
    /** A list of special entities that appear in the caption, which can be specified instead of parse_mode */
    caption_entities?: MessageEntity[]
    /** Pass True if the photo needs to be covered with a spoiler animation */
    has_spoiler?: boolean
    /** Sends the message silently. Users will receive a notification with no sound. */
    disable_notification?: boolean
}
