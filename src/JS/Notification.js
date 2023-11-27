import { inject } from 'vue';

const toast = inject('$toast');

export  function  showToast() {
    toast("This is a toast!");
}