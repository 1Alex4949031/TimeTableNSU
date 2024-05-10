import {ref} from "vue";

export const selectedSubjects = ref()

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
                console.log("ALLOW")
            }
            console.log("--", allowedSub.room, allowedSub.dayNumber, allowedSub.pairNumber, allowedSub.teacher)
            console.log(sub.room, sub.dayNumber, sub.pairNumber, sub.teacher)
        }

    return isAllowedMove
    // for (let i = 0; i < 6; i++) {
    //     for (let j = 0; j < 7; j++) {
    //         allowedArr.value[i][j] = true;
    //     }
    // }
    // const selectedSub = allSub.value[id]
    // for (const sub of Object.values(allSub.value)) {
    //     if (selectedSubjects.value[sub.id] === undefined) {
    //         if (selectedSub.teacher === sub.teacher) {
    //             allowedArr.value[sub.dayNumber-1][sub.pairNumber-1] = false
    //            // console.log("teacher")
    //         } else if (selectedSub.groups === sub.groups) { //Надо импрувить.
    //             allowedArr.value[sub.dayNumber-1][sub.pairNumber-1] = false
    //            // console.log("gr")
    //         } else if (selectedSub.room === sub.room) { //Надо импрувить.
    //             allowedArr.value[sub.dayNumber-1][sub.pairNumber-1] = false
    //            // console.log("room")
    //         }
    //     }
    // }
}