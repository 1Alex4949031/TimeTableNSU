import {reactive, ref} from "vue";

const tableArray = reactive(Array(7).fill().map(() => Array(6).fill(false)))

export const selectedDay = ref()
export const selectedPair = ref()

export function toggleSelection(lessonNumber, day, multipleSelect) {
    if (!multipleSelect) {
        selectedDay.value = day;
        selectedPair.value = lessonNumber

    } else {
        // Переключение состояния ячейки
        tableArray[lessonNumber - 1][day - 1] = !tableArray[lessonNumber - 1][day - 1];
    }
}

export function isSelected(lessonNumber, day) {
    // Проверка, выбрана ли ячейка
    return tableArray[lessonNumber - 1][day - 1];
}
