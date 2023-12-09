import {customInstance} from "@/js/axios-instance";

// {
//     "constraintNameRu": "string",
//     "group": 0,
//     "group1": 0,
//     "group2": 0,
//     "number": 0,
//     "day": 0,
//     "teacher": "string",
//     "teacher1": "string",
//     "teacher2": "string",
//     "period": 0
// }

export function addConstrains(data) {
    customInstance
        .post(
            '/api/constraints/create_constraint',
            data,
            {useToken: true, requestName: "Create constrains", showToast: true}
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export async function getConstrains() {
    return await customInstance
        .get(
            '/api/constraints/get_all',
            {useToken: true, requestName: "Get constrains", showToast: true}
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
            return response.data
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
            return [];
        });
}

export function removeConstrains(id) {
    customInstance
        .delete(
            '/api/constraints/delete_constraint/' + id,
            {useToken: true, requestName: "Create constrains", showToast: true}
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}