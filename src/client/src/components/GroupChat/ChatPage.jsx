import Input from "./ChatPage/Input/Input"
import Messages from "./Messages/Messages"

export default function ChatPage({ states: { message, setMessage, sendMessage, messages } }) {


    return <div className="d-flex flex-column align-items-between justify-content-center tab-pane fade show active"
        id="Chat"
        role="tabpanel" aria-labelledby="chat-tab"
    >
        <Messages messages={messages} />
        <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
        />
    </div>
}