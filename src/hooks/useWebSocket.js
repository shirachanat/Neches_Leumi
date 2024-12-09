import { useEffect, useState } from "react";
import { useConanimContext } from "../contexts/context";
import { statusesDesc } from "../dec";
let ws;
export const useWebSocket = () => {
    const { filteredResponders, setFilteredResponders, recivedMessage, setRecivedMessage } = useConanimContext();
    const [wsConeected, setWsConeected] = useState(false);
    const [mockStarted, setMockStarted] = useState(false);
    useEffect(() => {
        if (!ws || !wsConeected) {
            ws = new WebSocket('wss://neches-leumi-server.onrender.com');
            setWsConeected(true);
        }
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
                    if (data?.messageType === 'text') setRecivedMessage(prev => [...prev, { sender: data?.sender, message: data?.body, time: new Date().toLocaleTimeString() }]);
                    else setFilteredResponders(copy);
                    console.log(recivedMessage);

                }
            } catch (error) {
                console.error(error);
            }
        };

        if (!mockStarted) mockMessages.forEach((msg, index) => {
            const delay = msg.delay || 1000; // Default delay of 1000ms
            setTimeout(() => {
                const mockMessage = createMockMessage(msg.sender, msg.latitude, msg.longitude, msg.status, msg.body, msg.messageType);
                ws.onmessage({ data: mockMessage });
            }, delay + index * 1000); // Stagger messages to simulate real-time updates
        });
        if (!mockStarted) mockTextMessages.forEach((msg, index) => {
            const delay = msg.delay || 1000; // Default delay of 1000ms
            setTimeout(() => {
                const mockMessage = createMockMessage(msg.sender, msg.latitude, msg.longitude, msg.status, msg.body, msg.messageType);
                ws.onmessage({ data: mockMessage });
            }, delay + index * 1000); // Stagger messages to simulate real-time updates
        });
        setMockStarted(true);
        ws.onclose = (event) => {
            setWsConeected(false);
            console.log('Connection closed:', event.code, event.reason);
        }
    }, [filteredResponders.length, recivedMessage.length]);
    useEffect(() => {
        return () => ws.close()
    }, [])
}
// Helper function to create mock messages
const createMockMessage = (sender, latitude, longitude, status , body, messageType) => {
    return JSON.stringify({
        sender,
        body: body, // Include sender in the body for clarity
        ...(latitude && { latitude: latitude }),
        ...(longitude && { longitude : longitude }),
        ...(status && { status : status }),
        ...(status && { status : status }),
        ...(messageType && { messageType : messageType })
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
const mockTextMessages =[
    { sender: '0501234567', messageType: 'text', body: 'אני בדרך לאירוע, הגעתי לפקק תנועה.', delay: 30000 },
    { sender: '0501234567', messageType: 'text', body: 'יצאתי לפעולה, אשמח לעדכון נוסף.', delay: 15000 },
    
    { sender: '0586529546', messageType: 'text', body: 'אני מתקרב למקום האירוע, עוד 5 דקות הגעה.', delay: 25000 },
    { sender: '0586529546', messageType: 'text', body: 'בדרך, אשמח לדעת אם יש עדכונים נוספים.', delay: 20000 },
    
    { sender: '067-7788990', messageType: 'text', body: 'יצאתי לדרך, מעריך הגעה בעוד 10 דקות.', delay: 10000 },
    { sender: '067-7788990', messageType: 'text', body: 'נתקלתי בעיכוב קל, מתקרב לאירוע.', delay: 18000 },
    
    { sender: '0584480346', messageType: 'text', body: 'בדרך לאירוע, תשתדלו לעדכן אם יש צורך נוסף.', delay: 40000 },
    { sender: '0584480346', messageType: 'text', body: 'מגיע תוך רגעים ספורים.', delay: 15000 },
    
    { sender: '0584480345', messageType: 'text', body: 'אני מגיע עוד רגעים ספורים, ממתין להנחיות נוספות.', delay: 15000 },
    { sender: '0584480345', messageType: 'text', body: 'מצב תקין, ממשיך להתקדם.', delay: 10000 },
    
    { sender: '0505711183', messageType: 'text', body: 'יש עיכוב קל, תנועה כבדה בדרך לאירוע.', delay: 20000 },
    { sender: '0505711183', messageType: 'text', body: 'מגיע בקרוב, עדכנו אם יש שינוי.', delay: 17000 },
    
    { sender: '0583456789', messageType: 'text', body: 'אני בדרך, הכל תקין כרגע.', delay: 5000 },
    { sender: '0583456789', messageType: 'text', body: 'כמעט במקום האירוע, ממתין להנחיות.', delay: 12000 },
    
    { sender: '0573456789', messageType: 'text', body: 'מתקרב לאזור האירוע, מעריך הגעה תוך דקות ספורות.', delay: 12000 },
    { sender: '0573456789', messageType: 'text', body: 'מגיע בקרוב, המצב נראה יציב.', delay: 15000 },
    
    { sender: '0561234567', messageType: 'text', body: 'יצאתי לכיוון האירוע, אעדכן בהתקדמות.', delay: 22000 },
    { sender: '0561234567', messageType: 'text', body: 'נמצא קרוב, ייתכן שאגיע בעוד רגע.', delay: 18000 },
    
    { sender: '0551234567', messageType: 'text', body: 'בדרך לאירוע, נא לשמור על ערוץ פתוח לעדכונים.', delay: 18000 },
    { sender: '0551234567', messageType: 'text', body: 'מגיע עוד מעט, הכל נראה רגוע.', delay: 16000 },
    
    { sender: '0541234567', messageType: 'text', body: 'מתקרב למקום, המצב כרגע תקין.', delay: 30000 },
    { sender: '0541234567', messageType: 'text', body: 'במקום האירוע, אעדכן בקרוב.', delay: 20000 },
    
]