import {customInstance} from "@/js/axios-instance";
import {selectedSubjects} from "@/js/edit-timetable";
export async function saveEditRequest(ArrSubject) {
    let url = "/timetable/potential/change"
    if (ArrSubject['newTeacherFullName'] !== selectedSubjects.value['teacher']) {
        url += "/teacher"
    } else {
        url += "/day_and_pair_number_and_room"
    }
    return await customInstance
        .post(
            url,
            ArrSubject,
            {
                useToken: false,
                requestName: "Update potential timetable"
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

export async function getAllowedOption(id) {
    return await customInstance
        .post(
            "/timetable/potential/change/pair_variants",
            {
                subjectId: id
            },
            {
                useToken: false,
                requestName: "Get Allowed Option",
                timeout: 70000
            }
        )
        .then(response => {
            return response.data.potentialVariants
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
            return null
        });
}