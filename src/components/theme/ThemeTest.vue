<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useThemeTestStore } from "@/stores/themeTest";
import ThemeTestItem from "@/components/theme/item/ThemeTestItem.vue";

const router = useRouter();

const store = useThemeTestStore();

const buttonBasicStyle =
  "mb-20 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-md shadow-gray-900/10 hover:bg-first-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none";

const buttonDisabledStyle = "pointer-events-none bg-second-500 text-second-700/100";

const buttonAbledStyle = "bg-first-300 text-white";

const buttonStyle = computed(() => {
  return store.isDone
    ? `${buttonBasicStyle} ${buttonAbledStyle}`
    : `${buttonBasicStyle} ${buttonDisabledStyle}`;
});

const done = () => {
  store.calcualteResult();
  router.push({ name: "theme-result", params: { theme: store.result } });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-20">
    <div class="container text-center">
      <ThemeTestItem v-for="question in store.questions" :key="question.id" :question="question" />
    </div>
    <button :class="buttonStyle" type="button" @click="done">DONE</button>
  </div>
</template>

<style scoped></style>
