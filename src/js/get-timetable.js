// Пример получаемых данных (массив обьектов)
// [
//     {
//         "id": 1,
//         "dayNumber": 1,
//         "subjectName": "software engineering",
//         "groups": "21213",
//         "teacher": "miginsky",
//         "faculty": null,
//         "course": 0,
//         "pairNumber": 1,
//         "room": "306",
//         "startTime": null,
//         "endTime": null,
//         "pairType": "lab"
//     },
//     {
//         "id": 2,
//         "dayNumber": 1,
//         "subjectName": "physical culture",
//         "groups": "21213,21214,21215,21216",
//         "teacher": "fizruk",
//         "faculty": null,
//         "course": 0,
//         "pairNumber": 2,
//         "room": "1274",
//         "startTime": null,
//         "endTime": null,
//         "pairType": "lec"
//     }
// ]
//
// Пример использования на странице админ навигейт
// Получения факультета пока не добавлял, немогу придумать где использовать, но вытащить можно


import {customInstance} from "@/js/axios-instance";

export async function getGroupTimetable(group, potential = false) {
    let url = '/timetable/actual/group/' + group
    if (potential) {
        url = url.replace("actual", "potential")
    }
    return await customInstance
        .get(
            url,
            {useToken: potential, requestName: "Get group timetable" + group}
        )
        .then(response => {
            console.log(response.data)
            return response.data
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
            return null
        });
}

export async function getTeacherTimetable(teacher, potential = false) {
    let url = '/timetable/actual/teacher/' + teacher
    if (potential) {
        url = url.replace("actual", "potential")
    }
    return await customInstance
        .get(
            url,
            {useToken: potential, requestName: "Get teacher timetable" + teacher}
        )
        .then(response => {
            return response.data
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
            return null
        });

}

export async function getRoomTimetable(room, potential = false) {
    let url = '/timetable/actual/room/' + room
    if (potential) {
        url = url.replace("actual", "potential")
    }
    return await customInstance
        .get(
            url,
            {useToken: potential, requestName: "Get room timetable" + room}
        )
        .then(response => {
            return response.data
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
            return null
        });
}

export async function getAllTimetable(potential = false) {
    let url = "/timetable/actual/all"
    if (potential) {
        url = url.replace("actual", "potential")
    }
    return await customInstance
        .get(
            url,
            {
                useToken: potential,
                requestName: "Get all timetable",
                showToast: false
            }
        )
        .then(response => {
            return response.data
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
            return null
        });
}