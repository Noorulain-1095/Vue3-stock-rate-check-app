import { shallowMount } from '@vue/test-utils';
import StockList from '@/components/StockList.vue';

describe('StockList.vue', () => {
  it('renders a list of stocks', () => {
    const stocks = [
      { isin: 'US1234567890', price: 100, bid: 99, ask: 101 },
      { isin: 'US0987654321', price: 200, bid: 198, ask: 202 }
    ];
    const wrapper = shallowMount(StockList, {
      propsData: { stocks }
    });
    expect(wrapper.exists()).toBe(true);
  });
  it('emits "unsubscribe" event when delete button is clicked', async () => {
    const stocks = [
      { isin: 'US123', price: 100, bid: 98, ask: 102 }
    ];
    const wrapper = shallowMount(StockList, {
      propsData: { stocks }
    });
    const deleteButton = wrapper.find('.btn-delete');
    await deleteButton.trigger('click');
    expect(wrapper.emitted('unsubscribe')).toBeTruthy();
    expect(wrapper.emitted('unsubscribe')[0]).toEqual(['US123']); // Check emitted value
  });
  
});

