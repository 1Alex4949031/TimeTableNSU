
import {ref, onUnmounted} from 'vue';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {useToast} from "vue-toastification";

export const {isConnected, message, connect, disconnect} = useWebSocket();
export const logs = ref([])

const toast = useToast();
function useWebSocket() {
    const isConnected = ref(false);
    const message = ref(null);
    let stompClient = null;

    const connect = () => {
        if (!isConnected.value) {
            const socket = new SockJS('http://localhost:7070/websockets');
            stompClient = Stomp.over(() => socket);
            stompClient.connect({}, () => {
                isConnected.value = true;
                message.value = "Connected";
                logs.value.push({description: "Connected"})
                stompClient.subscribe('/notifications/newLog', (message) => {
                    console.log(message.body, typeof message.body);
                    const messageData = JSON.parse(message.body);
                    logs.value.push(messageData)
                    toast.warning("Текущее расписание отстает от последней версии: " + messageData.description, { timeout: false  })
                });
            });
        }
    }
    const disconnect = () => {
        if (isConnected.value && stompClient) {
            stompClient.disconnect(() => {
                isConnected.value = false;
                console.log("OWN: " + message.value);
            });
        }
    };

    onUnmounted(() => {
        disconnect();
    });

    return {isConnected, message, connect, disconnect};
}