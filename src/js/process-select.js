export function processGroup(rawGroup) {
    return rawGroup.map(group => {
        return {value: group.groupNumber, label: group.groupNumber + " " + group.faculty};
    });
}

export function processSubject(rawSubject) {
    return rawSubject.map(subject => {
        return {value: subject, label: subject};
    });
}

export function processRoom(rawRoom) {
    return rawRoom.map(room => {
        return {value: room.name, label: room.name + " " + room.type + " Вместимость: " + room.capacity};
    });
}

export function processPlan(rawPlan) {
    return rawPlan.map(plan => {
        return {
            value: plan.id,
            label: plan.teacher + " " + plan.subject + " Вместимость: " + plan.groups + " " + plan.subjectType + " " + plan.timesInAWeek
        };
    });
}