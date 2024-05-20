<script setup>
import { ref } from "vue";
import { useThemeTestStore } from "@/stores/themeTest";
import RoundedCheckbox from "@/components/theme/item/RoundedCheckbox.vue";

const props = defineProps({
  question: Object,
});

const store = useThemeTestStore();

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
  // 이전에 check한 checkbox uncheck하기
  if (checkedIndex !== -1) {
    checkboxes.value[checkedIndex].checked = !checkboxes.value[checkedIndex].checked;
  }

  if (checkedIndex === index) {
    // 똑같은 checkbox를 check한 경우
    checkedIndex = -1;

    // 점수 계산하기
    store.calculateValueOfQuestion(props.question.id, -1);
  } else {
    // 다른 checkbox를 check한 경우
    checkedIndex = index;
    checkboxes.value[checkedIndex].checked = !checkboxes.value[checkedIndex].checked;

    // 점수 계산하기
    store.calculateValueOfQuestion(props.question.id, Math.abs(6 - index));
  }
};
</script>

<template>
  <div class="mb-20 container text-center">
    <h5
      class="text-blue-gray-700 block mb-3 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-inherit"
    >
      {{ question.text }}
    </h5>
    <div class="flex justify-center">
      <h6
        class="text-blue-400 mr-8 inline-flex items-center block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit"
      >
        Agree
      </h6>
      <RoundedCheckbox
        v-for="(checkbox, index) in checkboxes"
        :key="index"
        :index="index"
        :color="checkbox.color"
        :size="checkbox.size"
        :checked="checkbox.checked"
        @check-event="handleCheckEvent"
      />
      <h6
        class="text-third-300 ml-8 inline-flex items-center block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit"
      >
        Disagree
      </h6>
    </div>
  </div>
</template>

<style scoped></style>
