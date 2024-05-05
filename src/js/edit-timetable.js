import {ref} from "vue";

export const selectedSubjects = ref({})

export const allSub = ref({})

export function checkAllowed(id, allowedArr) {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            allowedArr.value[i][j] = true;
        }
    }
    const selectedSub = allSub.value[id]
    for (const sub of Object.values(allSub.value)) {
        if (selectedSubjects.value[sub.id] === undefined) {
            if (selectedSub.teacher === sub.teacher) {
                allowedArr.value[sub.dayNumber-1][sub.pairNumber-1] = false
               // console.log("teacher")
            } else if (selectedSub.groups === sub.groups) { //Надо импрувить.
                allowedArr.value[sub.dayNumber-1][sub.pairNumber-1] = false
               // console.log("gr")
            } else if (selectedSub.room === sub.room) { //Надо импрувить.
                allowedArr.value[sub.dayNumber-1][sub.pairNumber-1] = false
               // console.log("room")
            }
        }
    }
}