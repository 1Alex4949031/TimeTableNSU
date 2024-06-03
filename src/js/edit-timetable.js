import {ref} from "vue";

let selectedSubjects = null

export function setSelectedSub(item) {
    selectedSubjects = item
    const myObjectString = JSON.stringify(item);
    localStorage.setItem("selectedSubject", myObjectString)
}

export function getSelectedSub() {
    if (selectedSubjects === null) {
        const retrievedObjectString = localStorage.getItem("selectedSubject");
        selectedSubjects = JSON.parse(retrievedObjectString);
    }
    return selectedSubjects
}

export const allSub = ref({})

export function checkAllowed(sub, options, allowedArr, allowedRoom, allowedTeacher) {
    let isAllowedMove = false
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            allowedArr.value[i][j] = false;
        }
    }
    allowedTeacher.value = []
    allowedRoom.value = []

    for (const allowedSub of options.value) {
        if (allowedSub.room === sub.room && allowedSub.teacher === sub.teacher) {
            allowedArr.value[allowedSub.dayNumber - 1][allowedSub.pairNumber - 1] = true
        }
        if (allowedSub.room === sub.room && allowedSub.dayNumber === sub.dayNumber && allowedSub.pairNumber === sub.pairNumber) {
            allowedTeacher.value.push(allowedSub.teacher)
            console.log(allowedSub.teacher)
        }
        if (allowedSub.teacher === sub.teacher && allowedSub.dayNumber === sub.dayNumber && allowedSub.pairNumber === sub.pairNumber) {
            allowedRoom.value.push(allowedSub.room)
        }
        if (allowedSub.room === sub.room &&
            allowedSub.dayNumber === sub.dayNumber &&
            allowedSub.pairNumber === sub.pairNumber &&
            allowedSub.teacher === sub.teacher
        ) {
            isAllowedMove = true
        }
    }

    return isAllowedMove

}