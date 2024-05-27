import {useState} from "react";
import {HubConnectionBuilder} from "@microsoft/signalr";
import './Chat.css'
import {unstable_renderSubtreeIntoContainer} from "react-dom";

const Chat = () => {
    const [connection, setConnection] = useState()
    const [username, setUsername] = useState('')
    const [isAuth, setIsAuth] = useState(false)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    const joinChat = async (user) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5178/chat")
                .build()
            setConnection(connection)

            connection.on("newMessage", (user, message) => {
                setMessages(prev => [...prev, {user, message}])
                console.log(messages)
            })

            connection.onclose(e => {
                setConnection();
                setMessages([])
                setUsername('')
                setIsAuth(false)
            })

            await connection.start()
            await connection.invoke("Connect", username)
        }
        catch (e) {
            console.log(e)
        }
    }

    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendMessage", message)
        }
        catch (e) {
            console.log(e)
        }
    }

    const enterChat = () => {
        if (username !== '') {
            setIsAuth(true);
            joinChat(username)
                .then(() => {
                    fetch('http://localhost:5178/getall')
                        .then(response => response.json())
                        .then(json => {
                            setMessages(prev => {
                                return [...prev, ...json]
                            })
                        })
                })
        }
    }

    if (!isAuth)
        return <div className="chat-username-input">
            <p>Write your username</p>
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                type="text"/>
            <button onClick={enterChat}>Join chat</button>
        </div>

    return (
        <div className="chat">
            <div>
                <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    type="text"/>
                <button onClick={() => {
                    sendMessage(message)
                        .then(() => setMessage(''))
                }}>Send message</button>
            </div>
            {
                messages.map(i => {
                    if (i.user === username)
                        return <div className="user-message">{`${i.message} :${i.user}`}</div>
                    return <div className="other-message">{`${i.user}: ${i.message}`}</div>
                })
            }
        </div>
    )
}

export default Chat