import { shallowMount } from '@vue/test-utils';
import StockForm from '@/components/StockForm.vue'; // Corrected import

describe('StockForm.vue', () => {
    it('binds input field correctly', async () => {
        const wrapper = shallowMount(StockForm); // Corrected mount function
        const input = wrapper.find('input');
        await input.setValue('US123');
        expect(wrapper.vm.isin).toBe('US123');
    });

    it('emits "addStock" event on form submission', async () => {
        const wrapper = shallowMount(StockForm); // Corrected mount function
        const input = wrapper.find('input');
        await input.setValue('US123');
        await wrapper.find('form').trigger('submit.prevent');
        expect(wrapper.emitted('addStock')).toBeTruthy();
        expect(wrapper.emitted('addStock')[0]).toEqual(['US123']); // Check emitted value
    });

    it('clears input field after form submission', async () => {
        const wrapper = shallowMount(StockForm); // Corrected mount function
        const input = wrapper.find('input');
        await input.setValue('US123');
        await wrapper.find('form').trigger('submit.prevent');
        expect(wrapper.vm.isin).toBe(''); // Check if input field is cleared
    });
});
