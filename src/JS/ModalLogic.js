import {ref} from "vue";

export const isVisibleAuth = ref(false);
export function closeModalAuth () {
    isVisibleAuth.value = false;
}
export function openModalAuth () {
    isVisibleAuth.value = true;
}

export const isVisibleDayTimeSelect = ref(false);
export function closeModalDayTimeSelect () {
    isVisibleDayTimeSelect.value = false;
}
export function openModalDayTimeSelect () {
    isVisibleDayTimeSelect.value = true;
}