import { useEffect } from "react";
import { useConanimContext } from "../contexts/context";
import { statusesDesc } from "../dec";
let ws;
export const useWebSocket = () => {
    const { filteredResponders, setFilteredResponders } = useConanimContext();
    useEffect(() => {
        ws = new WebSocket('wss://neches-leumi-server.onrender.com');
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                let senderIndex = filteredResponders.findIndex(conan => conan.phone === data.sender);
                if (senderIndex !== -1) {
                    let copy = [...filteredResponders];
                    if (data?.body) copy[senderIndex].body = data?.body;
                    if (data?.latitude) copy[senderIndex].latitude = data?.latitude;
                    if (data?.longitude) copy[senderIndex].longitude = data?.longitude;
                    if (data?.status) copy[senderIndex].messageStatus = statusesDesc[data?.status] || 0;
                    setFilteredResponders(copy);
                }
            } catch (error) {
                console.error(error);
            }
        };

        mockMessages.forEach((msg, index) => {
            const delay = msg.delay || 1000; // Default delay of 1000ms
            setTimeout(() => {
                const mockMessage = createMockMessage(msg.sender, msg.latitude, msg.longitude, msg.status);
                ws.onmessage({ data: mockMessage });
            }, delay + index * 1000); // Stagger messages to simulate real-time updates
        });

        ws.onclose = (event) => console.log('Connection closed:', event.code, event.reason);
        return () => ws.close();
    }, [filteredResponders.length])
}
// Helper function to create mock messages
const createMockMessage = (sender, latitude, longitude, status = 'active') => {
    return JSON.stringify({
        sender,
        body: `Test message body for ${sender}`, // Include sender in the body for clarity
        latitude,
        longitude,
        status,
    });
};
const mockMessages = [
    { sender: '0584480345', arrived: true, status: 'delivered', latitude: 31.9335, longitude: 34.8735 },
    { sender: '0584480345', arrived: true, status: 'delivered', latitude: 31.9340, longitude: 34.8740, delay: 3000 },
    //{ sender: '0584480346'arrived:true, status:2, latitude: 31.9328, longitude: 34.8732 },
    { sender: '0584480346', arrived: true, status: 'delivered', latitude: 31.9332, longitude: 34.8738, delay: 7000 },
    //{ sender: '0505711183'arrived:true, status:2, latitude: 31.9342, longitude: 34.8739 },
    { sender: '0505711183', arrived: true, status: 'delivered', latitude: 31.9336, longitude: 34.8742, delay: 9000 },
    // { sender: '0505711183'arrived:true, status:2, latitude: 31.9339, longitude: 34.8744, delay: 11000, status: 5 },
    { sender: '0586529546', arrived: true, status: 'delivered', latitude: 31.9337, longitude: 34.8741, delay: 5000, status: 5 },
    { sender: '0501234567', arrived: true, status: 'delivered', latitude: 31.9338, longitude: 34.8736, delay: 11000, status: 5 },
    { sender: '0521234567', arrived: true, status: 'delivered', latitude: 31.9341, longitude: 34.8743, delay: 13000 },
    { sender: '0531234567', arrived: true, status: 'delivered', latitude: 31.9333, longitude: 34.8737, delay: 15000 },
    { sender: '0541234567', arrived: true, status: 'delivered', latitude: 31.9345, longitude: 34.8739, delay: 17000 },
    { sender: '0551234567', arrived: true, status: 'delivered', latitude: 31.9329, longitude: 34.8731, delay: 19000 },
    { sender: '0561234567', arrived: true, status: 'delivered', latitude: 31.9334, longitude: 34.8740, delay: 21000 },
    { sender: '0571234567', arrived: true, status: 'delivered', latitude: 31.9340, longitude: 34.8738 },
    { sender: '0581234567', arrived: true, status: 'delivered', latitude: 31.9336, longitude: 34.8734 },
    { sender: '0591234567', arrived: true, status: 'delivered', latitude: 31.9343, longitude: 34.8736 },
    { sender: '0502345678', arrived: true, status: 'delivered', latitude: 31.9335, longitude: 34.8742 },
    { sender: '0522345678', arrived: true, status: 'delivered', latitude: 31.9338, longitude: 34.8733 },
    { sender: '0532345678', arrived: true, status: 'delivered', latitude: 31.9332, longitude: 34.8739, delay: 6000 },
    { sender: '0542345678', arrived: true, status: 'delivered', latitude: 31.9339, longitude: 34.8737 },
    { sender: '0552345678', arrived: true, status: 'delivered', latitude: 31.9337, longitude: 34.8740 },
    { sender: '0562345678', arrived: true, status: 'delivered', latitude: 31.9341, longitude: 34.8745 },
    { sender: '0572345678', arrived: true, status: 'delivered', latitude: 31.9327, longitude: 34.8738 },
    { sender: '0582345678', arrived: true, status: 'delivered', latitude: 31.9333, longitude: 34.8744 },
    { sender: '0592345678', arrived: true, status: 'delivered', latitude: 31.9339, longitude: 34.8735, delay: 8000 },
    { sender: '0503456789', arrived: true, status: 'delivered', latitude: 31.9334, longitude: 34.8732 },
    { sender: '0523456789', arrived: true, status: 'delivered', latitude: 31.9335, longitude: 34.8736 },
    { sender: '0533456789', arrived: true, status: 'delivered', latitude: 31.9343, longitude: 34.8738 },
    { sender: '0543456789', arrived: true, status: 'delivered', latitude: 31.9329, longitude: 34.8735 },
    { sender: '0553456789', arrived: true, status: 'delivered', latitude: 31.9341, longitude: 34.8741 },
    { sender: '0563456789', arrived: true, status: 'delivered', latitude: 31.9337, longitude: 34.8743 },
    { sender: '0573456789', arrived: true, status: 'delivered', latitude: 31.9336, longitude: 34.8739 },
    { sender: '0583456789', arrived: true, status: 'delivered', latitude: 31.9338, longitude: 34.8737, delay: 4000 },
];
