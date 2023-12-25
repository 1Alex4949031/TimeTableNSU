<script setup>
import imageModal from "@/assets/images/imageModal1.png";
import {onMounted, ref} from "vue";
import {getGroups, getTeachers} from "@/js/add-get-request";
import DayTimeSelectModal from "@/components/admin-Page/Day-Time-Select-Modal.vue";
import {addConstraint} from "@/js/constraint-requests";
import {isSelected} from "@/js/selected-timetable";
import {constraint, daysWithKey} from "@/js/data-for-show";
import Multiselect from "@vueform/multiselect";

const teachers = ref([])
const teacher = ref("")
const allGroups = ref([])
const groups = ref()

const maxDay = ref(7)

const lockDay = ref()


const selectedConstraint = ref("")

function addConstraints() {
  switch (selectedConstraint.value) {
    case 'Запрещенный день для преподавания для препода' : {
      addConstraint({constraintNameRu: selectedConstraint.value, teacher: teacher.value, day: lockDay.value})
      break;
    }
    case 'Запрещенный день для преподавания для группы' : {
      for (let group of groups.value) {
        addConstraint({constraintNameRu: selectedConstraint.value, group: group, day: lockDay.value})
      }
      break;
    }
    case 'Максимальное кол-во рабочих дней' : {
      addConstraint({constraintNameRu: selectedConstraint.value, teacher: teacher.value, number: maxDay.value})
      break;
    }
    case 'Запрещенный порядковый номер пары для препода в определённый день' : {
      for (let day = 1; day <= 6; day++) {
        for (let lessonNumber = 1; lessonNumber <= 7; lessonNumber++) {
          console.log(isSelected(1, 1))
          if (isSelected(lessonNumber, day)) {
            addConstraint({
              constraintNameRu: selectedConstraint.value,
              teacher: teacher.value,
              day: day,
              period: lessonNumber
            })
          }
        }
      }
      break;
    }
    case 'Запрещенные порядковый номер пары для групп в определённый день' : {
      for (let group of groups.value) {
        for (let day = 1; day <= 6; day++) {
          for (let lessonNumber = 1; lessonNumber <= 7; lessonNumber++) {
            console.log(isSelected(1, 1))
            if (isSelected(lessonNumber, day)) {
              addConstraint({
                constraintNameRu: selectedConstraint.value,
                group: group,
                day: day,
                period: lessonNumber
              })
            }
          }
        }
      }
      break;
    }
  }
}

onMounted(async () => {
  getTeachers(teachers)
  const rawGroup = await getGroups(allGroups)
  for (let x of rawGroup) {
    allGroups.value.push(x.groupNumber)
  }
})

</script>

<template>
  <div>
    <b-row data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
      <b-col md="6">
        <b-col class="mt-4 ms-4 me-4">
          <h2 class="modal-title mb-4">Управление Ограничениями</h2>
          <b-form>

            <b-form-group class="form-group" label="Тип ограничения" label-for="input-group-type">
              <b-form-select v-model="selectedConstraint" :options="constraint" label="Выберите опцию"
                             id="input-group-type"/>
            </b-form-group>

            <div v-if="selectedConstraint === 'Максимальное кол-во рабочих дней'">
              <b-form-group class="form-group" label="Преподователь" label-for="input-subject-teacher">
                <b-form-select v-model="teacher" :options="teachers" label="ФИО" id="input-subject-teacher"/>
              </b-form-group>
              <b-form-group class="form-group" label="Количество рабочих дней" label-for="input-teacher-cap">
                <b-form-input class="custom-input" v-model="maxDay" id="input-teacher-cap"
                              placeholder="" type="number"/>
              </b-form-group>
            </div>

            <div v-if="selectedConstraint === 'Запрещенный порядковый номер пары для препода в определённый день'">
              <b-form-group class="form-group" label="Преподователь" label-for="input-subject-teacher">
                <b-form-select v-model="teacher" :options="teachers" label="ФИО" id="input-subject-teacher"/>
              </b-form-group>
              <DayTimeSelectModal/>
            </div>
            <div v-if="selectedConstraint === 'Запрещенные порядковый номер пары для групп в определённый день'">
              <b-form-group class="form-group" label="Группы" label-for="input-subject-groups">
                <Multiselect
                    v-model="groups"
                    mode="tags"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="true"
                    :options="allGroups"
                />
              </b-form-group>
              <DayTimeSelectModal/>
            </div>

            <div v-if="selectedConstraint === 'Запрещенный день для преподавания для группы'">
              <b-form-group class="form-group" label="Группы" label-for="input-subject-groups">
                <Multiselect
                    v-model="groups"
                    mode="tags"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="true"
                    :options="allGroups"
                />
              </b-form-group>
              <b-form-group class="form-group" label="Нерабочий день" label-for="input-teacher-cap">
                <b-form-select v-model="lockDay" :options="daysWithKey" label="Нерабочие дни"
                               id="input-subject-teacher"/>
              </b-form-group>
            </div>

            <div v-if="selectedConstraint === 'Запрещенный день для преподавания для препода'">
              <b-form-group class="form-group" label="Преподователь" label-for="input-subject-teacher">
                <b-form-select v-model="teacher" :options="teachers" label="ФИО" id="input-subject-teacher"/>
              </b-form-group>
              <b-form-group class="form-group" label="Нерабочий день" label-for="input-teacher-cap">
                <b-form-input class="custom-input" v-model="lockDay" id="input-teacher-cap"
                              placeholder="" type="number"/>
              </b-form-group>
            </div>

            <b-button class="custom-btn" @click="addConstraints">
              Создать ограничение
            </b-button>
          </b-form>
        </b-col>
      </b-col>
      <b-col md="6">
        <b-col class="mt-3 me-5 ms-5">
          <b-img :src=imageModal alt="Modal image" fluid class="rounded-custom"></b-img>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.rounded-custom {
  border-radius: 130px;
}

.custom-btn {
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 1.5rem;
  width: 100%;
  transition: background-color 0.5s ease;
}
</style>