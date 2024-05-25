<template>
    <div>
      <StockForm :watchlist="watchlist" @addStock="subscribe" />
      <StockList :stocks="watchlist" @unsubscribe="unsubscribe" />
      <div v-if="!isConnected" class="notification">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  import useWebSocket from '@/composables/useWebSocket';
  import StockForm from '@/components/StockForm.vue';
  import StockList from '@/components/StockList.vue';
  
  export default {
    components: {
      StockForm,
      StockList
    },
    setup() {
      const { watchlist, subscribe, unsubscribe, errorMessage, isConnected } = useWebSocket();
  
      return {
        watchlist,
        subscribe,
        unsubscribe,
        errorMessage,
        isConnected
      };
    }
  };
  </script>

  