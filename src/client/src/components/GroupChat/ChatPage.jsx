import Input from "./Input/Input"
import Messages from "./Messages/Messages"

export default function ChatPage({ states: { message, setMessage, sendMessage, messages } }) {


    return <div className="d-flex flex-column align-items-between justify-content-center tab-pane fade show active"
        id="chatpage"
        role="tabpanel" aria-labelledby="chatpage-tab"
    >
        <Messages messages={messages} />
        <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
        />
    </div>
}