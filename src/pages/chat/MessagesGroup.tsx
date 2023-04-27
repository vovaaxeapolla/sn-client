import { IMessage } from "../../interfaces/IMessage";
import Message from "./Message";
import { memo } from "react";

const MessagesGroup = ({ userId, messages }: { userId: string, messages: IMessage[] }) => {
    return (
        <div className="ChatDialog__container">
            {messages.map((msg: IMessage) => <Message key={Math.random()} message={msg} isMine={userId === msg.author_id} />)}
        </div>
    )
}

export default memo(MessagesGroup);