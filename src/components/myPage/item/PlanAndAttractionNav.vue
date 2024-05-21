<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  menu: String,
});

const buttonBasicStyle =
  "w-1/2 px-6 py-3 font-sans text-xs font-bold text-center uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none";

const selectedButtonStyle =
  "text-third-300 bg-third-50 hover:bg-third-400/10 active:bg-third-400/20";

const unselectedButtonStyle = "text-third-300 hover:bg-third-400/10 active:bg-third-400/20";

const planButtonStyle = ref("rounded-r-none");
const attractionButtonStyle = ref("rounded-l-none");

onMounted(() => {
  let menu = props.menu;

  if (menu === "plan") {
    planButtonStyle.value = `${planButtonStyle.value} ${buttonBasicStyle} ${selectedButtonStyle}`;
    attractionButtonStyle.value = `${attractionButtonStyle.value} ${buttonBasicStyle} ${unselectedButtonStyle}`;
  } else {
    planButtonStyle.value = `${planButtonStyle.value} ${buttonBasicStyle} ${unselectedButtonStyle}`;
    attractionButtonStyle.value = `${attractionButtonStyle.value} ${buttonBasicStyle} ${selectedButtonStyle}`;
  }
});
</script>

<template>
  <div class="flex divide-x divide-third-300/70 row w-[65%]">
    <button :class="planButtonStyle" type="button">PLAN</button>
    <button :class="attractionButtonStyle" type="button">ATTRACTION</button>
  </div>
</template>

<style></style>
