<script setup>
import { computed, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useThemeTestStore } from "@/stores/themeTest";
import ThemeTestItem from "@/components/theme/item/ThemeTestItem.vue";

const router = useRouter();

const store = useThemeTestStore();

onUnmounted(() => {
  store.init();
});

const buttonBasicStyle =
  "mt-10 mb-20 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-md shadow-gray-900/10 hover:bg-first-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none";

const buttonDisabledStyle = "pointer-events-none bg-second-500 text-second-700/100";

const buttonAbledStyle = "bg-first-300 text-white";

const preButtonStyle = computed(() => {
  return currentPage.value
    ? `${buttonBasicStyle} ${buttonAbledStyle}`
    : `${buttonBasicStyle} ${buttonDisabledStyle}`;
});

const buttonStyle = computed(() => {
  return store.isDone
    ? `${buttonBasicStyle} ${buttonAbledStyle}`
    : `${buttonBasicStyle} ${buttonDisabledStyle}`;
});

const isLast = computed(() => {
  return currentPage.value === lastPage.value;
});

const done = () => {
  store.calcualteResult();
  router.push({ name: "theme-result", params: { theme: store.result } });
};

const currentPage = ref(0);
const lastPage = ref(Math.ceil(store.questions.length / 5) - 1);
const currnetQuestions = computed(() => {
  let start = 5 * currentPage.value;
  return store.questions.slice(start, start + 5);
});

const goPre = () => {
  currentPage.value--;

  scrollToTop();
};

const goNext = () => {
  currentPage.value++;

  scrollToTop();
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<template>
  <div class="flex justify-center mt-10">
    <div class="flex flex-col w-[45%]">
      <div
        class="p-10 relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl min-h-[200px] w-full"
      >
        <ThemeTestItem
          v-for="question in currnetQuestions"
          :key="question.id"
          :question="question"
        />
      </div>
      <div class="flex flex-row justify-between" v-show="!isLast">
        <button :class="preButtonStyle" type="button" @click="goPre">PRE</button>
        <button :class="[buttonBasicStyle, buttonAbledStyle]" type="button" @click="goNext">
          NEXT
        </button>
      </div>
      <div class="flex flex-row justify-between" v-show="isLast">
        <button :class="preButtonStyle" type="button" @click="goPre">PRE</button>
        <button :class="buttonStyle" type="button" @click="done">DONE</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-width {
  width: 60%;
}
</style>
