import {customInstance} from "@/js/axios-instance";

export function createNewTimetable(useTestingParam = false) {
    let url = "/timetable/potential/create_timetable_db"
    if (useTestingParam) {
        url = url.replace("create_timetable_db", "create_timetable_kolya")
    }
    customInstance
        .post(
            url,
            {},
            {useToken: true, requestName: "Create timetable"}
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export function activateNewTimetable() {
    customInstance
        .post(
            "/timetable/potential/activate",
            {},
            {useToken: true, requestName: "Activate timetable"}
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export async function startCreatingNewTimetable(useTestingParam = false) {

    let url = "/timetable/potential/create_timetable_db_async"
    if (useTestingParam) {
        url = url.replace("create_timetable_db", "create_timetable_kolya")
    }
    await customInstance
        .post(
            url,
            {},
            {useToken: true, requestName: "Create timetable async"}
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export async function checkNewTimetableStatus() {
    return await customInstance
        .get(
            "/timetable/potential/check_file",
            {
                useToken: true,
                requestName: "Check New Timetable Status",
                toastSuccessText: "Статус обновлён!",
                successErrorOpportunity: true,
                toastErrorDataText: "Ошибка при составлении расписания"
            }
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
            const ans = response.data.message
            console.log(ans)
            return ans
        })
        .catch(error => {
            console.error(error)
            if(error.message !== undefined)
                return "Ошибка!"
            return ["Ошибка при составлении расписания", error]
        });
}