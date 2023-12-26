import {ref} from "vue";

export const roomTypes = [
    {value: "lec", text: "Лекционная"},
    {value: "prac", text: "Практическая"},
    {value: "lab", text: "Лабораторная"},
]


export const constraint = ref([
    'Максимальное кол-во рабочих дней',
    'Запрещенный порядковый номер пары для препода в определённый день',
    'Запрещенные порядковый номер пары для групп в определённый день',
    'Запрещенный день для преподавания для препода',
    'Запрещенный день для преподавания для группы',
    'Перегруз учителей (?)',
    'Перегруз групп (??)'
])

export const pairTimes = {
    1: '9:00',
    2: '10:50',
    3: '12:40',
    4: '14:30',
    5: '16:20',
    6: '18:10',
    7: '20:00'
};

export const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

export const daysWithKey = days.map((day, index) => ({ value: index + 1, text: day }));

export const faculties = {
    "ГГФ": {
        name: "Геолого-геофизический факультет",
        imageSrc: require("@/assets/images/faculties/ggf.png"),
    },
    "ФИТ": {
        name: "Факультет информационных технологий",
        imageSrc: require("@/assets/images/faculties/fit.png"),
    },
    "ГИ": {
        name: "Гуманитарный институт",
        imageSrc: require("@/assets/images/faculties/hf.png"),
    },
    "ИИР": {
        name: "Институт интеллектуальной робототехники",
        imageSrc: require("@/assets/images/faculties/irf.png"),
    },
    "ИМПЗ": {
        name: "Институт медицины и психологии В. Зельмана",
        imageSrc: require("@/assets/images/faculties/medz.png"),
    },
    "ИФП": {
        name: "Институт философии и права",
        imageSrc: require("@/assets/images/faculties/flf.png"),
    },
    "ММФ": {
        name: "Механико-математический факультет",
        imageSrc: require("@/assets/images/faculties/mmf.png"),
    },
    "ФЕН": {
        name: "Факультет естественных наук",
        imageSrc: require("@/assets/images/faculties/nsf.png"),
    },
    "ФФ": {
        name: "Физический факультет",
        imageSrc: require("@/assets/images/faculties/fizf.png"),
    },
    "ЭФ": {
        name: "Экономический факультет",
        imageSrc: require("@/assets/images/faculties/ef.png"),
    }
}

export const facultiesName = Object.keys(faculties).filter(item => item !== "Все_группы");
