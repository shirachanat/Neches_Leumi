import { useEffect } from "react";
import { useConanimContext } from "../contexts/context";
import { statusesDesc } from "../dec";

let ws;
export const useWebSocket = () => {
    const { filteredResponders, setFilteredResponders } = useConanimContext();
    useEffect(() => {
        ws = new WebSocket('wss://neches-leumi-server.onrender.com');
        // Log messages from the server
        ws.onclose = (event) => console.log('Connection closed:', event.code, event.reason);
        return () => ws.close();
    }, [])
    if (ws) ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            let senderIndex = filteredResponders.findIndex(conan => conan.phone === data.sender);
            if (senderIndex !== -1) {
                let copy = [...filteredResponders];
                if (data?.body) copy[senderIndex].body = data?.body;
                if (data?.latitude) copy[senderIndex].latitude = data?.latitude;
                if (data?.longitude) copy[senderIndex].longitude = data?.longitude;
                if (data?.status) copy[senderIndex].messageStatus = statusesDesc[data?.status];
                setFilteredResponders(copy);
            }
        } catch (error) {
            console.error(error);
        }
    };
}
