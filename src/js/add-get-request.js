import {customInstance} from "@/js/axios-instance";
import router from "@/router/router";

//Room group teacher subject plan
//Оставил тосты только для создания плана
export function addRoom(name, type, capacity) {
    customInstance
        .post(
            '/api/admin/create_room',
            {name, type, capacity},
            {
                useToken: true,
                requestName: "Create room",
                toastId: Math.random(),
                toastSuccessText: "Комната  " + name + " добавлена"
            }
        )
        .then(response => {
            router.push({path: "/admNav"}).then(x => console.log(x || "Навигация завершена!"))
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export function addGroup(groupNumber, faculty, studentsNumber, course) {
    customInstance
        .post(
            '/api/admin/create_group',
            {groupNumber, faculty, course, studentsNumber},
            {
                useToken: true,
                requestName: "Create group",
                toastId: Math.random(),
                toastSuccessText: "Группа " + groupNumber + " добавлена"
            }
        )
        .then(response => {
            router.push({path: "/admNav"}).then(x => console.log(x || "Навигация завершена!"))
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export function addSubject(name, timesInAWeek) {
    customInstance
        .post(
            'api/admin/create_subject',
            {name, timesInAWeek},
            {
                useToken: true,
                requestName: "Create subject",
                toastId: Math.random(),
                toastSuccessText: "Предмет " + name + " добавлен"
            }
        )
        .then(response => {
            router.push({path: "/admNav"}).then(x => console.log(x || "Навигация завершена!"))
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export function addPlan(teacher, subject, timesInAWeek, subjectType, groups) {
    console.log(teacher, subject, timesInAWeek, subjectType, groups)
    customInstance
        .post(
            'api/admin/create_plan',
            {teacher, subject, timesInAWeek, subjectType, groups},
            {
                useToken: true,
                requestName: "Create subject",
                toastId: Math.random(),
                toastSuccessText: "Предмет " + subject + " для группы " + groups
            }
        )
        .then(response => {
            // router.push({path: "/admNav"}).then(x => console.log(x || "Навигация завершена!"))
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}


export function regTeacher(email, fullName, phone) {
    customInstance
        .post(
            '/api/admin/register_teacher',
            {email, fullName, phone},
            {
                useToken: true,
                requestName: "Registration teacher",
                showToast: true,
                toastSuccessText: "Учитель " + fullName + " создан"
            }
        )
        .then(response => {
            router.push({path: "/admNav"}).then(x => console.log(x || "Навигация завершена!"))
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export function getTeachers(teachers) {
    customInstance
        .get(
            '/get/all_teachers',
            {useToken: false, requestName: "Get teacher", showToast: false}
        )
        .then(response => {
            teachers.value = response.data
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export async function getGroups() {
    return customInstance
        .get(
            '/get/all_groups',
            {useToken: false, requestName: "Get group", showToast: false}
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
            return response.data
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export function getFacultyGroups(faculty, groupFeedback) {
    let url = '/get/faculty_groups' + '/' + faculty
    if (faculty === 'Все_группы')
        url = "/get/all_groups"
    customInstance
        .get(
            url,
            {useToken: false, requestName: "Get group faculty", showToast: false}
        )
        .then(response => {
            groupFeedback.value = response.data
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export async function getSubject() {
    return customInstance
        .get(
            '/get/all_subjects',
            {useToken: false, requestName: "Get all subjects", showToast: false}
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
            return response.data
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export async function getRoom() {
    return customInstance
        .get(
            '/get/all_rooms',
            {useToken: false, requestName: "Get all rooms", showToast: false}
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
            return response.data
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export function removeRoom(room) {
    customInstance
        .post(
            '/api/admin/delete_room/' + room,
            {useToken: true, requestName: "Remove room", showToast: true}
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export function removeGroup(group) {
    customInstance
        .post(
            '/api/admin/delete_group/' + group,
            {useToken: true, requestName: "Remove group", showToast: true}
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export function removeSubject(subject) {
    customInstance
        .post(
            '/api/admin/delete_subject/' + subject,
            {useToken: true, requestName: "Remove subject", showToast: true}
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}