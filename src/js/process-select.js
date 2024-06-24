export const roomTypeParse = (roomType) => {
    switch (roomType) {
        case "prac":
            return "Практическая"
        case "lab":
            return "Лабораторная"
        case "lec":
            return "Лекционная"
    }
}

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
        return {value: room.name, label: roomTypeParse(room.type) + " " + room.name + " Вместимость: " + room.capacity};
    });
}

export function processPlan(rawPlan) {
    return rawPlan.map(plan => {
        return {
            value: plan.id,
            label: "Учитель: " + plan.teacher + " Предмет: " + plan.subject + " Группы: " + plan.groups + " Раз в неделю: " + plan.timesInAWeek + " Аудитория: " + roomTypeParse(plan.subjectType)
        };
    });
}