import { memo } from "react"
import { IMessage } from "../../interfaces/IMessage";
import classNames from "classnames";

const Message = ({ message, isMine }: { message: IMessage, isMine: boolean }) => {
    return (
        <div key={Math.random()}
            className={classNames('ChatDialog__message', { ['ChatDialog__message-right']: isMine })}
        >
            {message.text}
        </div>
    );
}

export default memo(Message);