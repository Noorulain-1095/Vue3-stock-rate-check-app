<template>
  <table>
    <caption>Stocks WatchList </caption>
    <thead>
      <tr>
        <th scope="col">ISIN</th>
        <th scope="col">Stock Price</th>
        <th scope="col">Stock Bid</th>
        <th scope="col">Stock Ask</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody> 
      <tr v-for="stock in stocks" :key="stock.isin">
        <td data-label="ISIN">{{ stock.isin }}</td>
        <td data-label="Stock Price">{{ formatPrice(stock.price) }}</td>
        <td data-label="Stock Bid">{{ formatPrice(stock.bid) }}</td>
        <td data-label="Stock Ask">{{ formatPrice(stock.ask) }}</td>
        <td>
          <button class="btn btn-delete" @click="unsubscribe(stock.isin)">
            <span class="mdi mdi-delete mdi-24px"></span>
            <span class="mdi mdi-delete-empty mdi-24px"></span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from 'vue';
import { Stock } from '../types/types';

export default defineComponent({
  name: 'StocksWatchList',
  props: {
    stocks: {
      type: Array as PropType<Stock[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const unsubscribe = (isin: string) => {
      emit('unsubscribe', isin);
    };

    const formatPrice = (value: number): string => {
      return `$ ${value.toFixed(2)}`;
    };

    return {
      unsubscribe,
      formatPrice
    };
  },
});
</script>


