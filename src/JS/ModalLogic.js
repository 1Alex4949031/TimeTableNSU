import {ref} from "vue";

export const isVisibleAuth = ref(false);
export function closeModalAuth () {
    isVisibleAuth.value = false;
}
export function openModalAuth () {
    isVisibleAuth.value = true;
}