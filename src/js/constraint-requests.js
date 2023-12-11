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

export function addConstraint(data) {
    //Временное решение
    const newData = {constraintNameRu: "", group: 0, group1: 0, group2: 0, day: 1, number: 1,period: 1,teacher: "Faa",teacher1: "Faa",teacher2: "Faa", ...data}
    customInstance
        .post(
            '/api/constraints/create_constraint',
            newData,
            {useToken: true, requestName: "Create constraint", showToast: true}
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

export async function getConstraint() {
    return await customInstance
        .get(
            '/api/constraints/get_all',
            {useToken: true, requestName: "Get constraint", showToast: true}
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

export function removeConstraint(id) {
    customInstance
        .delete(
            '/api/constraints/delete_constraint/' + id,
            {useToken: true, requestName: "Create constraint", showToast: true}
        )
        .then(response => {
            console.log(response.config["requestName"], "Done")
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}