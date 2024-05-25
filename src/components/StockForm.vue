<template>
    <form @submit.prevent="handleSubmit">
      <input v-model="isin" placeholder="Enter ISIN" required @input="clearError"/>
      <button type="submit">Add Stock</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
</template>
  
<script>

import { ref } from 'vue';

export default {
  props: {
    watchlist: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const isin = ref('');
    const error = ref('');

    const clearError = () => {
      error.value = '';
    };

    const handleSubmit = () => {
      if (!validateISIN(isin.value)) {
        error.value = 'Invalid ISIN format';
        console.log( error.value )
        return;
      }
      
      if (props.watchlist.some(stock => stock.isin === isin.value)) {
        error.value = 'This ISIN already exists in your watchlist.';
        return;
      }

      emit('addStock', isin.value);
      isin.value = '';
      error.value = '';
    };

    const validateISIN = (value) => {
      const isinRegex = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;
      return isinRegex.test(value);
    };

    return {
      isin,
      error,
      handleSubmit,
      clearError
    };
  }
};
  
</script>
  