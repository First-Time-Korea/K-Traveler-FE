<script setup>
import { ref } from "vue";
import RoundedCheckbox from "@/components/theme/item/RoundedCheckbox.vue";

const props = defineProps({
  question: Object,
});

const checkboxes = ref([
  { color: "first", size: "lg", checked: false },
  { color: "first", size: "md", checked: false },
  { color: "first", size: "sm", checked: false },
  { color: "second", size: "xsm", checked: false },
  { color: "third", size: "sm", checked: false },
  { color: "third", size: "md", checked: false },
  { color: "third", size: "lg", checked: false },
]);

let checkedIndex = -1;
const handleCheckEvent = (index) => {
  if (checkedIndex !== -1) {
    checkboxes.value[checkedIndex].checked = !checkboxes.value[checkedIndex].checked;
  }

  if (checkedIndex === index) {
    checkedIndex = -1;

    // TODO: 질문 점수 설정하기
    // -1
  } else {
    checkedIndex = index;
    checkboxes.value[checkedIndex].checked = !checkboxes.value[checkedIndex].checked;

    // TODO: 질문 점수 설정하기
    // Math.abs(6 - index)
  }
};
</script>

<template>
  <div class="mb-20 container text-center">
    <h4
      class="block mb-3 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-inherit text-blue-gray-700"
    >
      {{ question.text }}
    </h4>
    <div class="flex justify-center">
      <RoundedCheckbox
        v-for="(checkbox, index) in checkboxes"
        :key="index"
        :index="index"
        :color="checkbox.color"
        :size="checkbox.size"
        :checked="checkbox.checked"
        @check-event="handleCheckEvent"
      />
    </div>
  </div>
</template>

<style scoped></style>
