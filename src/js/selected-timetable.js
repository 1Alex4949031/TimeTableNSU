import {reactive} from "vue";

const tableArray = reactive(Array(7).fill().map(() => Array(6).fill(false)))

export function toggleSelection(lessonNumber, day) {
    // Переключение состояния ячейки
    tableArray[lessonNumber - 1][day - 1] = !tableArray[lessonNumber - 1][day - 1];
}

export function isSelected(lessonNumber, day) {
    // Проверка, выбрана ли ячейка
    return tableArray[lessonNumber - 1][day - 1];
}
