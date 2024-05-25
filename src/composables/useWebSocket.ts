import { ref, onMounted, onUnmounted } from 'vue';
import { Stock } from '@/types/types';

export default function useWebSocket() {
  const watchlist = ref<Stock[]>([]);
  const isConnected = ref(false);
  const errorMessage = ref('');
  let socket: WebSocket | null = null;
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;
  const reconnectInterval = 3000;

  const handleMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    const updatedWatchlist = watchlist.value.map(stock => {
      if (stock.isin === data.isin) {
        return {
          ...stock,
          price: data.price ?? null,
          bid: data.bid ?? null,
          ask: data.ask ?? null,
        };
      }
      return stock;
    });
    watchlist.value = updatedWatchlist;
  };
  

  const handleOpen = () => {
    isConnected.value = true;
    errorMessage.value = '';
    reconnectAttempts = 0;
    console.log('WebSocket connected');
  };

  const handleClose = () => {
    isConnected.value = false;
    errorMessage.value = 'WebSocket disconnected. Data may not be up to date.';
    console.log('WebSocket disconnected');
    if (reconnectAttempts < maxReconnectAttempts) {
      setTimeout(() => {
        reconnectAttempts++;
        connectWebSocket();
      }, reconnectInterval);
    }
  };

  const handleError = (error: Event) => {
    console.error('WebSocket error:', error);
    errorMessage.value = 'WebSocket error occurred. Attempting to reconnect...';
    handleClose();
  };

  const connectWebSocket = () => {
    socket = new WebSocket('ws://localhost:8425/');
    socket.addEventListener('open', handleOpen);
    socket.addEventListener('message', handleMessage);
    socket.addEventListener('close', handleClose);
    socket.addEventListener('error', handleError);
  };

  const subscribe = (isin: string) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket connection not established');
      return;
    }
    socket.send(JSON.stringify({ subscribe: isin }));
    watchlist.value.push({ isin, price: 0, bid: 0, ask: 0 });
  };

  const unsubscribe = (isin: string) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket connection not established');
      return;
    }
    socket.send(JSON.stringify({ unsubscribe: isin }));
    watchlist.value = watchlist.value.filter(stock => stock.isin !== isin);
  };

  onMounted(() => {
    connectWebSocket();
  });

  onUnmounted(() => {
    if (socket) {
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('message', handleMessage);
      socket.removeEventListener('close', handleClose);
      socket.removeEventListener('error', handleError);
      socket.close();
      socket = null;
    }
  });

  return {
    watchlist,
    isConnected,
    errorMessage,
    subscribe,
    unsubscribe,
  };
}
