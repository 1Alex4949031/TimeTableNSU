import {customInstance} from "@/js/axios-instance";
import router from "@/router/router";

//Room group teacher subject plan
//Оставил тосты только для создания плана
export function addRoom(name, type, capacity) {
    customInstance
        .post(
            '/api/admin/create_room',
            {name, type, capacity},
            {useToken: true, requestName: "Create room", showToast: false}
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
            {useToken: true, requestName: "Create group", showToast: false}
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
            {useToken: true, requestName: "Create subject", showToast: false}
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
            router.push({path: "/admNav"}).then(x => console.log(x || "Навигация завершена!"))
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
            {useToken: true, requestName: "Registration teacher", showToast: false}
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

export function getGroups(group) {
    customInstance
        .get(
            '/get/all_groups',
            {useToken: false, requestName: "Get group", showToast: false}
        )
        .then(response => {
            for (let x of response.data) {
                group.value.push(x.groupNumber)
            }
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export function getFacultyGroups(faculty, groupFeedback) {
    customInstance
        .get(
            '/get/faculty_groups' + '/' + faculty,
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
export function getSubject(subjectFeedback) {
    customInstance
        .get(
            '/get/all_subjects',
            {useToken: false, requestName: "Get group faculty", showToast: false}
        )
        .then(response => {
            subjectFeedback.value = response.data
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}