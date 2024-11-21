import React, { useEffect, useState } from "react";
import { useConanimContext } from "../../contexts/context";

const TestWebsocket = () => {
    const [messages, setMessages] = useState([]);
    const {conanim} = useConanimContext();
    console.log(conanim);
    
    useEffect(() => {
        const ws = new WebSocket('wss://neches-leumi-server.onrender.com');

        // Log messages from the server
        ws.onmessage = (event) => setMessages(prevMessages => [...prevMessages, event.data]);

        // Send a message to the server
        ws.onopen = () => ws.send('Hello from the client!');
        ws.onclose = (event) => console.log('Connection closed:', event.code, event.reason);
        return () => ws.close();
    }, [])
    return (<>
    {messages.map((message, index) => <p key={index}>{message}</p>)}
    </>)
}

export default TestWebsocket