import {customInstance} from "@/js/axios-instance";

export async function saveEdit(ArrSubject)  {
    return await customInstance
        .get(
            "/timetable/potential/change" + "/room",
            {useToken: false, requestName: "Update potential timetable"}
        )
        .then(response => {
            return response.data
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
            return null
        });
}

export async function getAllowedOption(id)  {
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